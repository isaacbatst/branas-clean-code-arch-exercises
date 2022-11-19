import {StockEntry} from '../../domain/entities/StockEntry';
import type {StockEntryRepository} from '../repositories/StockEntryRepository';

export class SaveStockEntry {
	constructor(
		private readonly stockEntryRepository: StockEntryRepository,
	) {}

	async execute(idItem: number, quantity: number, operation: string): Promise<{id: number}> {
		const count = await this.stockEntryRepository.count();

		const id = count + 1;
		const stockEntry = new StockEntry(id, idItem, quantity, operation);
		await this.stockEntryRepository.save(stockEntry);

		return {
			id,
		};
	}
}
