import type {OrderRepository} from '../../../application/repositories/OrderRepository';
import type Order from '../../../domain/entities/Order';
import {NotFoundError} from '../../../domain/errors/NotFoundError';

export class OrderRepositoryMemory implements OrderRepository {
	orders: Order[] = [];

	async getCount(): Promise<number> {
		return this.orders.length;
	}

	async save(order: Order): Promise<void> {
		this.orders.push(order);
	}

	async getByCode(code: string): Promise<Order> {
		const order = this.orders.find(order => order.code === code);

		if (!order) {
			throw new NotFoundError('Pedido não encontrado');
		}

		return order;
	}

	async update(updatedOrder: Order): Promise<void> {
		this.orders = this.orders.map(order => {
			if (order.code === updatedOrder.code) {
				return updatedOrder;
			}

			return order;
		});
	}
}
