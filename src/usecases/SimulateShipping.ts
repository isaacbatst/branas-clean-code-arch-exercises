import type Item from '../entities/Item';
import Shipping from '../entities/Shipping';

type Input = Array<{
	id: number;
}>;

export type ItemRepository = {
	getById(id: number): Promise<Item | undefined>;
};

export class SimulateShipping {
	constructor(
		private readonly itemRepository: ItemRepository,
	) {}

	async execute(input: Input): Promise<number> {
		const shipping = new Shipping();

		await Promise.all(input.map(async ({id}) => {
			const item = await this.itemRepository.getById(id);

			if (!item) {
				throw new Error('ITEM_NOT_FOUND');
			}

			shipping.addItem(item.dimensions, item.weight);
		}));

		return shipping.getValue();
	}
}
