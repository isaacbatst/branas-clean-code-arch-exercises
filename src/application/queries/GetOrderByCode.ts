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
		const order = await prisma.order.findUnique({
			where: {
				code,
			},
			include: {
				orderItems: {
					include: {
						item: true,
					},
				},
			},
		});

		if (!order) {
			throw new NotFoundError('ORDER_NOT_FOUND');
		}

		return {
			date: order.date,
			destination: order.destination,
			total: order.total.toNumber(),
			code: order.code,
			orderItems: order.orderItems.map(orderItem => ({
				description: orderItem.item.description,
				idItem: orderItem.itemId,
				price: orderItem.price.toNumber(),
				quantity: orderItem.quantity,
			})),
		};
	}
}
