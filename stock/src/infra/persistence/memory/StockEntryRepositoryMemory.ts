import type {StockEntryRepository} from '../../../application/repositories/StockEntryRepository';
import type {StockEntry} from '../../../domain/entities/StockEntry';

export class StockEntryRepositoryMemory implements StockEntryRepository {
	private readonly stockEntries: StockEntry[] = [];

	async save(stockEntry: StockEntry): Promise<void> {
		this.stockEntries.push(stockEntry);
	}

	async saveAll(stockEntries: StockEntry[]): Promise<void> {
		this.stockEntries.push(...stockEntries);
	}

	async nextId(): Promise<string> {
		return String(this.stockEntries.length + 1);
	}
}
