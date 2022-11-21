import {StockEntry} from '../../domain/entities/StockEntry';
import type {StockEntryRepository} from '../repositories/StockEntryRepository';

type Input = {
	orderItems: Array<{
		idItem: number; quantity: number;
	}>;
};

export class DecrementStock {
	constructor(
		private readonly stockEntryRepository: StockEntryRepository,
	) {}

	async execute(input: Input): Promise<void> {
		const now = new Date();

		await Promise.all(input.orderItems.map(async ({idItem, quantity}) => {
			const id = await this.stockEntryRepository.nextId();
			const stockEntry = new StockEntry(id, idItem, quantity, now, 'decrement');
			await this.stockEntryRepository.save(stockEntry);
		}));
	}
}
