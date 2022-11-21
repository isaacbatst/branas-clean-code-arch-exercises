import axios from 'axios';
import type {ItemDto, ItemGateway} from '../../application/gateway/ItemGateway';
import {GatewayError} from '../../domain/errors/GatewayError';

type ItemGatewayResponse = {
	id: number;
	description: string;
	price: number;
	weight: number;
	height: number;
	width: number;
	depth: number;
	addressCep: string;
};

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
			const response = await axios.get<ItemGatewayResponse>(`${this.catalogUrl}/item/${id}`);

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
			throw new GatewayError(`Erro ao recuperar item ${id}`);
		}
	}

	async getItems(ids: number[]): Promise<ItemDto[]> {
		try {
			const response = await axios.get<{items: ItemGatewayResponse[]}>(`${this.catalogUrl}/items?ids=${ids.join(',')}`);

			return response.data.items.map(item => ({
				addressCep: item.addressCep,
				dimensions: {
					depth: item.depth,
					width: item.width,
					height: item.height,
				},
				weight: item.weight,
				description: item.description,
				idItem: item.id,
				price: item.price,
			}));
		} catch (error: unknown) {
			console.error(error);

			throw new GatewayError(`Erro ao recuperar items: ${ids.join(',')}`);
		}
	}
}
