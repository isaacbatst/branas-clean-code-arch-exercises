import type {OrderProjectionRepository} from '../../../application/repositories/OrderProjectionRepository';
import type Order from '../../../domain/entities/Order';

export class OrderProjectionRepositoryMemory implements OrderProjectionRepository {
	private readonly orders: Order[] = [];

	async save(order: Order): Promise<void> {
		this.orders.push(order);
	}
}
