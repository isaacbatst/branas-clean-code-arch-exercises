import type {OrderRepository} from '../../../application/repositories/OrderRepository';
import type Order from '../../../domain/entities/Order';

export class OrderRepositoryMemory implements OrderRepository {
	orders: Order[] = [];

	async getCount(): Promise<number> {
		return this.orders.length;
	}

	async save(order: Order): Promise<void> {
		this.orders.push(order);
	}

	async getByCode(code: string): Promise<Order | undefined> {
		return this.orders.find(order => order.code === code);
	}
}