import type Order from '../../entities/Order';
import type {OrderRepository} from '../interfaces/OrderRepository';

export class OrderRepositoryMemory implements OrderRepository {
	orders: Order[] = [];

	async getCount(): Promise<number> {
		return this.orders.length;
	}

	async save(order: Order): Promise<void> {
		this.orders.push(order);
	}
}
