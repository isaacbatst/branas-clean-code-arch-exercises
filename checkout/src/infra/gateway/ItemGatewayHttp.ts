import axios from 'axios';
import type {ItemGateway} from '../../application/gateway/ItemGateway';
import Item from '../../domain/entities/Item';
import {GatewayError} from '../../domain/errors/GatewayError';

export class ItemGatewayHttp implements ItemGateway {
	private readonly catalogUrl: string;

	constructor() {
		if (!process.env.CATALOG_SERVICE_URL) {
			throw new Error('Catalog service url missing');
		}

		this.catalogUrl = process.env.CATALOG_SERVICE_URL;
	}

	async getById(id: number): Promise<Item> {
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

			return new Item({
				addressCep: response.data.addressCep,
				depth: response.data.depth,
				description: response.data.description,
				height: response.data.height,
				id: response.data.id,
				price: response.data.price,
				weight: response.data.weight,
				width: response.data.width,
			});
		} catch (err: unknown) {
			throw new GatewayError('Erro ao recuperar items');
		}
	}
}
