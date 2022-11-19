import type {ItemGateway} from '../../application/gateway/ItemGateway';
import Item from '../../domain/entities/Item';
import {NotFoundError} from '../../domain/errors/NotFoundError';

export class ItemGatewayFake implements ItemGateway {
	private readonly items: Item[] = [
		new Item({
			id: 1,
			description: 'Guitarra',
			depth: 10,
			height: 100,
			width: 30,
			price: 1000,
			weight: 3,
			addressCep: 'any-address',
		}),
		new Item({
			id: 2,
			description: 'amp',
			depth: 8,
			height: 15,
			width: 14,
			price: 5000,
			weight: 1,
			addressCep: 'any-address',
		}),
	];

	async getById(id: number): Promise<Item> {
		const item = this.items.find(item => item.idItem === id);

		if (!item) {
			throw new NotFoundError('Item não encontrado');
		}

		return item;
	}
}
