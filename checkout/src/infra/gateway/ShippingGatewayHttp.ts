import axios from 'axios';
import type {ShippingGateway} from '../../application/gateway/ShippingGateway';
import type Item from '../../domain/entities/Item';
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
			item: Item;
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
		item: Item;
		quantity: number;
	}>) {
		const body = orderItems.map(({item, quantity}) => ({
			id: item.idItem,
			dimensions: {
				width: item.dimensions.width,
				height: item.dimensions.height,
				depth: item.dimensions.depth,
			},
			weight: item.weight,
			quantity,
			origin: item.addressCep,
		}));

		return body;
	}
}
