import type {OrderRequestRepository} from '../../../application/repositories/OrderRequestRepository';
import type {OrderRequest} from '../../../domain/entities/OrderRequest';

export class RequestedOrderRepositoryMemory implements OrderRequestRepository {
	private readonly requestedOrders: OrderRequest[] = [];

	async getLastInsertedOnYear(year: number): Promise<OrderRequest | undefined> {
		return this.requestedOrders
			.filter(order => order.date.getFullYear() === year)
			.sort((a, b) => a.getCount() - b.getCount())
			.at(-1);
	}

	async save(requestedOrder: OrderRequest): Promise<void> {
		this.requestedOrders.push(requestedOrder);
	}
}
