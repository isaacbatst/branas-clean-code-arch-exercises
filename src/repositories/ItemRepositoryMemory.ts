import type Item from '../entities/Item';
import type {ItemRepository} from '../usecases/SimulateShipping';

export class ItemRepositoryMemory implements ItemRepository {
	private readonly items: Item[] = [];

	async getById(id: number): Promise<Item | undefined> {
		return this.items.find(item => item.idItem === id);
	}

	async addItem(item: Item) {
		this.items.push(item);
	}
}
