import type {ShippingGateway} from '../../application/gateway/ShippingGateway';
import type Item from '../../domain/entities/Item';

export class ShippingGatewayFake implements ShippingGateway {
	async calculateShipping(params: {
		destination: string;
		orderItems: Array<{
			item: Item;
			quantity: number;
		}>;
	}): Promise<Array<{id: number; shipping: number}>> {
		return params.orderItems.map(({item}) => ({
			id: item.idItem,
			shipping: 10,
		}));
	}
}
