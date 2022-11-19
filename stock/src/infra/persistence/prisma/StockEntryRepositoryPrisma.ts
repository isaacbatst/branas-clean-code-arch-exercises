import type {StockEntryRepository} from '../../../application/repositories/StockEntryRepository';
import type {StockEntry} from '../../../domain/entities/StockEntry';
import prisma from './prisma';

export class StockEntryRepositoryPrisma implements StockEntryRepository {
	async save(stockEntry: StockEntry): Promise<void> {
		await prisma.stockEntry.create({
			data: {
				id: stockEntry.id,
				idItem: stockEntry.idItem,
				operation: stockEntry.operation,
				quantity: stockEntry.quantity,
			},
		});
	}

	async count(): Promise<number> {
		return prisma.stockEntry.count();
	}
}
