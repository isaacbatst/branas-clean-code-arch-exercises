import type {StockEntryRepository} from '../../../application/repositories/StockEntryRepository';
import type {StockEntry} from '../../../domain/entities/StockEntry';
import prisma from './prisma';
import crypto from 'node:crypto';

export class StockEntryRepositoryPrisma implements StockEntryRepository {
	async save(stockEntry: StockEntry): Promise<void> {
		await prisma.stockEntry.create({
			data: {
				id: stockEntry.id,
				idItem: stockEntry.idItem,
				operation: stockEntry.operation,
				quantity: stockEntry.quantity,
				createdAt: stockEntry.createdAt,
			},
		});
	}

	async saveAll(stockEntries: StockEntry[]): Promise<void> {
		await prisma.stockEntry.createMany({
			data: stockEntries.map(stockEntry => ({
				id: stockEntry.id,
				idItem: stockEntry.idItem,
				operation: stockEntry.operation,
				quantity: stockEntry.quantity,
				createdAt: stockEntry.createdAt,
			})),
		});
	}

	async nextId(): Promise<string> {
		return crypto.randomUUID();
	}
}
