import ShippingCalculator from '../domain/entities/ShippingCalculator';
import {NotFoundError} from '../domain/errors/NotFoundError';
import type {ItemRepository} from '../domain/repositories/ItemRepository';

type Input = Array<{
	id: number;
	quantity: number;
}>;

export class SimulateShipping {
	constructor(
		private readonly itemRepository: ItemRepository,
	) {}

	async execute(input: Input): Promise<number> {
		let shipping = 0;

		await Promise.all(input.map(async ({id, quantity}) => {
			const item = await this.itemRepository.getById(id);

			if (!item) {
				throw new NotFoundError('Item não encontrado.');
			}

			shipping += ShippingCalculator.calculate(item) * quantity;
		}));

		return shipping;
	}
}
