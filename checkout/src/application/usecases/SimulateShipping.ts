import type Item from '../../domain/entities/Item';
import {NotFoundError} from '../../domain/errors/NotFoundError';
import type {ItemRepository} from '..//repositories/ItemRepository';
import type {ShippingGateway} from '../gateway/ShippingGateway';

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
		private readonly shippingGateway: ShippingGateway,
	) {}

	async execute(input: Input): Promise<number> {
		const items = await Promise.all(input.orderItems.map(async ({id, quantity}) => {
			const item = await this.itemRepository.getById(id);

			if (!item) {
				throw new NotFoundError('Item não encontrado.');
			}

			return {
				item,
				quantity,
			};
		}));

		const shipping = await this.shippingGateway.calculateShipping({
			destination: input.destination,
			orderItems: items,
		});

		const total = shipping.reduce((acc, {shipping}) => shipping + acc, 0);

		return total;
	}
}
