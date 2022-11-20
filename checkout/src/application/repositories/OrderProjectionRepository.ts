import type Order from '../../domain/entities/Order';
import type {ItemDto} from '../gateway/ItemGateway';

export type OrderProjectionRepository = {
	save(order: Order, items: ItemDto[]): Promise<void>;
};
