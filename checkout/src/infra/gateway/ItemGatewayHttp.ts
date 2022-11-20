import axios from 'axios';
import type {ItemDto, ItemGateway} from '../../application/gateway/ItemGateway';
import {GatewayError} from '../../domain/errors/GatewayError';

export class ItemGatewayHttp implements ItemGateway {
	private readonly catalogUrl: string;

	constructor() {
		if (!process.env.CATALOG_SERVICE_URL) {
			throw new Error('Catalog service url missing');
		}

		this.catalogUrl = process.env.CATALOG_SERVICE_URL;
	}

	async getById(id: number): Promise<ItemDto> {
		try {
			const response = await axios.get<{
				id: number;
				description: string;
				price: number;
				weight: number;
				height: number;
				width: number;
				depth: number;
				addressCep: string;
			}>(`${this.catalogUrl}/item/${id}`);

			return {
				addressCep: response.data.addressCep,
				dimensions: {
					depth: response.data.depth,
					width: response.data.width,
					height: response.data.height,
				},
				weight: response.data.weight,
				description: response.data.description,
				idItem: response.data.id,
				price: response.data.price,
			};
		} catch (err: unknown) {
			throw new GatewayError('Erro ao recuperar items');
		}
	}
}
