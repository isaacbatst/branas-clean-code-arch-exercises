import type {ItemDto, ItemGateway} from '../../application/gateway/ItemGateway';
import {NotFoundError} from '../../domain/errors/NotFoundError';

export class ItemGatewayFake implements ItemGateway {
	private readonly items: ItemDto[] = [
		{
			idItem: 1,
			description: 'Guitarra',
			dimensions: {
				depth: 10,
				height: 100,
				width: 30,
			},
			price: 1000,
			weight: 3,
			addressCep: 'any-address',
		},
		{
			idItem: 2,
			description: 'amp',
			dimensions: {
				depth: 8,
				height: 15,
				width: 14,
			},
			price: 5000,
			weight: 1,
			addressCep: 'any-address',
		},
	];

	async getById(id: number): Promise<ItemDto> {
		const item = this.items.find(item => item.idItem === id);

		if (!item) {
			throw new NotFoundError('Item não encontrado');
		}

		return item;
	}

	async getItems(ids: number[]): Promise<ItemDto[]> {
		return this.items.filter(item => ids.includes(item.idItem));
	}
}
