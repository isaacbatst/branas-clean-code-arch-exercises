import type Order from '../entities/Order';

export type OrderRepository = {
	getCount(): Promise<number>;
	save(order: Order): Promise<void>;
};
