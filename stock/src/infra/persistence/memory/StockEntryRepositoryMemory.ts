import type {StockEntryRepository} from '../../../application/repositories/StockEntryRepository';
import type {StockEntry} from '../../../domain/entities/StockEntry';

export class StockEntryRepositoryMemory implements StockEntryRepository {
	private readonly stockEntries: StockEntry[] = [];

	async save(stockEntry: StockEntry): Promise<void> {
		this.stockEntries.push(stockEntry);
	}

	async count(): Promise<number> {
		return this.stockEntries.length;
	}
}
