import type Item from '../../domain/entities/Item';

export type ShippingGateway = {
	calculateShipping(
		params: {
			destination: string;
			orderItems: Array<{item: Item; quantity: number}>;
		}): Promise<Array<{id: number; shipping: number}>>;
};
