import type {ItemParams} from '../entities/Item';
import Item from '../entities/Item';
import Order from '../entities/Order';
import type {CouponRepository} from '../repositories/interfaces/CouponRepository';
import type {OrderRepository} from '../repositories/interfaces/OrderRepository';

type Input = {
	cpf: string;
	items: Array<ItemParams & {quantity: number}>;
	coupon?: string;
};

type Output = {
	code: string;
	total: number;
};

export class CreateOrder {
	constructor(
		private readonly orderRepository: OrderRepository,
		private readonly couponRepository: CouponRepository,
	) {}

	async execute(input: Input): Promise<Output> {
		const count = await this.orderRepository.getCount();
		const order = new Order(input.cpf, new Date(), count);

		for (const item of input.items) {
			order.addItem(new Item(item), item.quantity);
		}

		if (input.coupon) {
			const coupon = await this.couponRepository.getByCode(input.coupon);

			if (!coupon) {
				throw new Error('Cupom não encontrado');
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
