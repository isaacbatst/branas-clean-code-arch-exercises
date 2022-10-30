import type Order from '../../../domain/entities/Order';
import type {OrderRepository} from '../../../domain/repositories/OrderRepository';

export class OrderRepositoryMemory implements OrderRepository {
	orders: Order[] = [];

	async getCount(): Promise<number> {
		return this.orders.length;
	}

	async save(order: Order): Promise<void> {
		this.orders.push(order);
	}
}
