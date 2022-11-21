import type {OrderRequestRepository} from '../../../application/repositories/RequestedOrderRepository';
import type {OrderRequest} from '../../../domain/entities/RequestedOrder';

export class RequestedOrderRepositoryMemory implements OrderRequestRepository {
	private readonly requestedOrders: OrderRequest[] = [];

	async getLastInsertedOnYear(year: number): Promise<OrderRequest | undefined> {
		return this.requestedOrders
			.filter(order => order.date.getFullYear() === year)
			.sort((a, b) => a.count - b.count)
			.at(-1);
	}

	async save(requestedOrder: OrderRequest): Promise<void> {
		this.requestedOrders.push(requestedOrder);
	}
}
