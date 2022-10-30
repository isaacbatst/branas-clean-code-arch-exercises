import Shipping from '../entities/Shipping';
import type {ItemRepository} from '../repositories/ItemRepository';

type Input = Array<{
	id: number;
}>;

export class SimulateShipping {
	constructor(
		private readonly itemRepository: ItemRepository,
	) {}

	async execute(input: Input): Promise<number> {
		const shipping = new Shipping();

		await Promise.all(input.map(async ({id}) => {
			const item = await this.itemRepository.getById(id);

			if (!item) {
				throw new Error('Item não encontrado.');
			}

			shipping.addItem(item.dimensions, item.weight);
		}));

		return shipping.getValue();
	}
}
