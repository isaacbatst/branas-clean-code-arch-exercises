import type {ItemDto} from '../../application/gateway/ItemGateway';
import type {ShippingGateway} from '../../application/gateway/ShippingGateway';

export class ShippingGatewayFake implements ShippingGateway {
	async calculateShipping(params: {
		destination: string;
		orderItems: Array<{
			item: ItemDto;
			quantity: number;
		}>;
	}): Promise<Array<{id: number; shipping: number}>> {
		return params.orderItems.map(({item}) => ({
			id: item.idItem,
			shipping: 10,
		}));
	}
}
