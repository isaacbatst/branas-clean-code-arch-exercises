import type Item from '../../domain/entities/Item';
import type Order from '../../domain/entities/Order';

export type OrderProjectionRepository = {
	save(order: Order, items: Item[]): Promise<void>;
};
