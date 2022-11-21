import type {StockEntry} from '../../domain/entities/StockEntry';

export type StockEntryRepository = {
	save(stockEntry: StockEntry): Promise<void>;
	saveAll(stockEntries: StockEntry[]): Promise<void>;
	nextId(): Promise<string>;
};
