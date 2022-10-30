import type Item from '../../../domain/entities/Item';
import type {ItemRepository} from '../../../domain/repositories/ItemRepository';

export class ItemRepositoryMemory implements ItemRepository {
	private readonly items: Item[] = [];

	async getById(id: number): Promise<Item | undefined> {
		return this.items.find(item => item.idItem === id);
	}

	async addItem(item: Item) {
		this.items.push(item);
	}
}
