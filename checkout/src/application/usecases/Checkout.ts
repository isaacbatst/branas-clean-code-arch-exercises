import Order from '../../domain/entities/Order';
import ShippingCalculator from '../../domain/entities/ShippingCalculator';
import {NotFoundError} from '../../domain/errors/NotFoundError';
import type {DistanceGateway} from '../gateway/DistanceGateway';
import type {CouponRepository} from '../repositories/CouponRepository';
import type {ItemRepository} from '../repositories/ItemRepository';
import type {OrderRepository} from '../repositories/OrderRepository';

type Input = {
	cpf: string;
	items: Array<{id: number; quantity: number}>;
	coupon?: string;
	destination: string;
};

type Output = {
	code: string;
	total: number;
};

export class Checkout {
	constructor(
		private readonly orderRepository: OrderRepository,
		private readonly couponRepository: CouponRepository,
		private readonly itemRepository: ItemRepository,
		private readonly distanceGateway: DistanceGateway,
	) {}

	async execute(input: Input): Promise<Output> {
		const count = await this.orderRepository.getCount();
		const order = new Order(input.cpf, new Date(), count, input.destination);
		await Promise.all(input.items.map(async ({id, quantity}) => {
			const item = await this.itemRepository.getById(id);
			if (!item) {
				throw new NotFoundError('ITEM_NOT_FOUND');
			}

			const distance = await this.distanceGateway.getDistanceByCep(item.addressCep, order.destination);
			const itemShipping = ShippingCalculator.calculate(item, distance);

			order.addItem(item, quantity, itemShipping);
		}));

		if (input.coupon) {
			const coupon = await this.couponRepository.getByCode(input.coupon);
			if (!coupon) {
				throw new NotFoundError('COUPON_NOT_FOUND');
			}

			order.addCoupon(coupon);
		}

		await this.orderRepository.save(order);
		return {
			code: order.code,
			total: order.getTotal(),
		};
	}
}
