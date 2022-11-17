import Order from '../../domain/entities/Order';
import {GatewayError} from '../../domain/errors/GatewayError';
import {NotFoundError} from '../../domain/errors/NotFoundError';
import type {ShippingGateway} from '../gateway/ShippingGateway';
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
		private readonly shippingGateway: ShippingGateway,
	) {}

	async execute(input: Input): Promise<Output> {
		const count = await this.orderRepository.getCount();
		const order = new Order(input.cpf, new Date(), count, input.destination);

		const items = await Promise.all(input.items.map(async ({id, quantity}) => {
			const item = await this.itemRepository.getById(id);
			if (!item) {
				throw new NotFoundError('ITEM_NOT_FOUND');
			}

			return {
				item,
				quantity,
			};
		}));

		const shippings = await this.shippingGateway.calculateShipping({
			destination: input.destination,
			orderItems: items,
		});

		items.forEach(({item, quantity}) => {
			const shippingItem = shippings.find(shippingItem => shippingItem.id === item.idItem);

			if (!shippingItem) {
				throw new GatewayError('Frete de item não calculado');
			}

			order.addItem(item, quantity, shippingItem.shipping);
		});

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
