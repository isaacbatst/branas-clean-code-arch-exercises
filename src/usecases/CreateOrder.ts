import type Coupon from '../entities/Coupon';
import type {ItemParams} from '../entities/Item';
import Item from '../entities/Item';
import Order from '../entities/Order';

type Input = {
	cpf: string;
	items: Array<ItemParams & {quantity: number}>;
	coupon?: string;
};

type Output = {
	code: string;
	shipping: number;
	total: number;
};

export type OrderRepository = {
	getCount(): Promise<number>;
	save(order: Order): Promise<void>;
};

export type CouponRepository = {
	getByCode(code: string): Promise<Coupon | undefined>;
	save(coupon: Coupon): Promise<void>;
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
			shipping: order.getShipping(),
			total: order.getTotal(),
		};
	}
}
