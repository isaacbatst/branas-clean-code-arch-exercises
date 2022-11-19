import type Order from '../../domain/entities/Order';

export type OrderRepository = {
	getCount(): Promise<number>;
	getByCode(code: string): Promise<Order>;
	update(order: Order): Promise<void>;
	save(order: Order): Promise<void>;
};
