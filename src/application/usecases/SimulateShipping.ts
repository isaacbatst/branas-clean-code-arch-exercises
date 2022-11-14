import ShippingCalculator from '../../domain/entities/ShippingCalculator';
import {NotFoundError} from '../../domain/errors/NotFoundError';
import type {ItemRepository} from '..//repositories/ItemRepository';
import type {DistanceGateway} from '../gateway/DistanceGateway';

type Input = {
	orderItems: Array<{
		id: number;
		quantity: number;
	}>;
	destination: string;
};

export class SimulateShipping {
	constructor(
		private readonly itemRepository: ItemRepository,
		private readonly distanceGateway: DistanceGateway,
	) {}

	async execute(input: Input): Promise<number> {
		let shipping = 0;

		await Promise.all(input.orderItems.map(async ({id, quantity}) => {
			const item = await this.itemRepository.getById(id);

			if (!item) {
				throw new NotFoundError('Item não encontrado.');
			}

			const distance = await this.distanceGateway.getDistanceByCep(item.addressCep, input.destination);

			const itemShipping = ShippingCalculator.calculate(item, distance) * quantity;
			shipping += itemShipping;
		}));

		return shipping;
	}
}
