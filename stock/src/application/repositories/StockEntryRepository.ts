import type {StockEntry} from '../../domain/entities/StockEntry';

export type StockEntryRepository = {
	save(stockEntry: StockEntry): Promise<void>;
	count(): Promise<number>;
};
