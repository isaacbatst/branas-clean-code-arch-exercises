import {StockEntry} from '../../domain/entities/StockEntry';
import type {StockEntryRepository} from '../repositories/StockEntryRepository';

type Input = {
	orderItems: Array<{
		idItem: number; quantity: number;
	}>;
};

export class IncrementStock {
	constructor(
		private readonly stockEntryRepository: StockEntryRepository,
	) {}

	async execute(input: Input): Promise<void> {
		const now = new Date();

		await Promise.all(input.orderItems.map(async ({idItem, quantity}) => {
			const id = await this.stockEntryRepository.nextId();
			const stockEntry = new StockEntry(id, idItem, quantity, now, 'increment');
			await this.stockEntryRepository.save(stockEntry);
		}));
	}
}
