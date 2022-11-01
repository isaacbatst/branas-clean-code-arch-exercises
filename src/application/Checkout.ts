import Item from '../domain/entities/Item';
import Order from '../domain/entities/Order';
import {NotFoundError} from '../domain/errors/NotFoundError';
import type {CouponRepository} from '../domain/repositories/CouponRepository';
import type {ItemRepository} from '../domain/repositories/ItemRepository';
import type {OrderRepository} from '../domain/repositories/OrderRepository';

type Input = {
	cpf: string;
	items: Array<{id: number; quantity: number}>;
	coupon?: string;
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
	) {}

	async execute(input: Input): Promise<Output> {
		const count = await this.orderRepository.getCount();
		const order = new Order(input.cpf, new Date(), count);

		await Promise.all(input.items.map(async ({id, quantity}) => {
			const item = await this.itemRepository.getById(id);

			if (!item) {
				throw new NotFoundError('ITEM_NOT_FOUND');
			}

			order.addItem(item, quantity);
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
