import type {OrderRequestRepository} from '../../../application/repositories/RequestedOrderRepository';
import {OrderRequest} from '../../../domain/entities/RequestedOrder';
import prisma from './prisma';

export class OrderRequestRepositoryPrisma implements OrderRequestRepository {
	async getLastInsertedOnYear(year: number): Promise<OrderRequest | undefined> {
		const last = await prisma.orderRequest.findFirst({
			where: {
				year,
			},
			orderBy: {
				date: 'desc',
			},
		});

		if (!last) {
			return;
		}

		return new OrderRequest(last.date, last.count);
	}

	async save(orderRequest: OrderRequest): Promise<void> {
		await prisma.orderRequest.create({
			data: {
				count: orderRequest.count,
				date: orderRequest.date,
				year: orderRequest.date.getFullYear(),
			},
		});
	}
}
