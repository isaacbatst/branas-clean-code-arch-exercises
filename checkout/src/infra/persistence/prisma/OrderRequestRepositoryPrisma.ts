import type {OrderRequestRepository} from '../../../application/repositories/OrderRequestRepository';
import {OrderRequest, OrderRequestStatus} from '../../../domain/entities/OrderRequest';
import prisma from './prisma';

export class OrderRequestRepositoryPrisma implements OrderRequestRepository {
	async getLastInsertedOnYear(year: number): Promise<OrderRequest | undefined> {
		const last = await prisma.orderRequest.findFirst({
			where: {
				code: {
					startsWith: String(year),
				},
			},
			orderBy: {
				date: 'desc',
			},
		});

		if (!last) {
			return;
		}

		return new OrderRequest(last.date, last.code, OrderRequestStatus[last.status]);
	}

	async save(orderRequest: OrderRequest): Promise<void> {
		await prisma.orderRequest.create({
			data: {
				code: orderRequest.orderCode,
				date: orderRequest.date,
				status: orderRequest.status,
			},
		});
	}
}
