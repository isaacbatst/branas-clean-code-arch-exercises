import type {StockGateway} from '../gateway/StockGateway';
import type {OrderRepository} from '../repositories/OrderRepository';

export class CancelOrder {
	constructor(
		private readonly orderRepository: OrderRepository,
		private readonly stockGateway: StockGateway,
	) {}

	async execute(code: string) {
		const order = await this.orderRepository.getByCode(code);

		order.cancel();

		await this.orderRepository.update(order);

		await Promise.all(order.orderItems.map(async orderItem => {
			await this.stockGateway.increment(orderItem.idItem, orderItem.quantity);
		}));
	}
}
