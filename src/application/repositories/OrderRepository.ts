import type Order from '../../domain/entities/Order';

export type OrderRepository = {
	getCount(): Promise<number>;
	save(order: Order): Promise<void>;
};
