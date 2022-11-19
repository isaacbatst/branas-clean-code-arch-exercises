import {NotFoundError} from '../../domain/errors/NotFoundError';
import prisma from '../../infra/persistence/prisma/prisma';

type Output = {
	date: Date;
	destination: string;
	total: number;
	code: string;
	orderItems: Array<{
		idItem: number;
		description: string;
		price: number;
		quantity: number;
	}>;
};

export class GetOrderByCode {
	async query(code: string): Promise<Output> {
		const order = await prisma.orderProjection.findUnique({
			where: {
				code,
			},
		});

		if (!order) {
			throw new NotFoundError('ORDER_NOT_FOUND');
		}

		const orderItems = order.orderItems as Array<{description: string; itemId: number; price: number; quantity: number}>;

		return {
			date: order.date,
			destination: order.destination,
			total: order.total.toNumber(),
			code: order.code,
			orderItems: orderItems.map(orderItem => ({
				description: orderItem.description,
				idItem: orderItem.itemId,
				price: orderItem.price,
				quantity: orderItem.quantity,
			})),
		};
	}
}
