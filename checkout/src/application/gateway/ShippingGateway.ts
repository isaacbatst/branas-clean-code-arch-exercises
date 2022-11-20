import type {ItemDto} from './ItemGateway';

export type ShippingGateway = {
	calculateShipping(
		params: {
			destination: string;
			orderItems: Array<{item: ItemDto; quantity: number}>;
		}): Promise<Array<{id: number; shipping: number}>>;
};
