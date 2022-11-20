import axios from 'axios';
import type {ItemDto} from '../../application/gateway/ItemGateway';
import type {ShippingGateway} from '../../application/gateway/ShippingGateway';
import {GatewayError} from '../../domain/errors/GatewayError';

export class ShippingGatewayHttp implements ShippingGateway {
	private readonly shippingUrl: string;

	constructor() {
		if (!process.env.SHIPPING_SERVICE_URL) {
			throw new Error('Shipping service url missing');
		}

		this.shippingUrl = process.env.SHIPPING_SERVICE_URL;
	}

	async calculateShipping(params: {
		destination: string;
		orderItems: Array<{
			item: ItemDto;
			quantity: number;
		}>;
	}): Promise<Array<{id: number; shipping: number}>> {
		try {
			const orderItems = this.mapToBodyOrderItems(params.orderItems);
			const response = await axios.post<{shipping: Array<{id: number; shipping: number}>}>(
				`${this.shippingUrl}/calculate/shipping`,
				{
					orderItems,
					destination: params.destination,
				},
			);

			return response.data.shipping;
		} catch (err: unknown) {
			throw new GatewayError('Erro ao calcular o frete');
		}
	}

	private mapToBodyOrderItems(orderItems: Array<{
		item: ItemDto;
		quantity: number;
	}>) {
		const body = orderItems.map(({item, quantity}) => ({
			...item,
			origin: item.addressCep,
			quantity,
		}));

		return body;
	}
}
