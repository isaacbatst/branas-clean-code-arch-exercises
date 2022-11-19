import type {OrderProjectionRepository} from '../../../application/repositories/OrderProjectionRepository';
import type Item from '../../../domain/entities/Item';
import type Order from '../../../domain/entities/Order';
import prisma from './prisma';

export class OrderProjectionRepositoryPrisma implements OrderProjectionRepository {
	async save(order: Order, items: Item[]): Promise<void> {
		const orderItemsProjection = order.orderItems.map(orderItem => {
			const item = items.find(item => orderItem.idItem === item.idItem);

			if (!item) {
				throw new Error('Item inválido');
			}

			return {
				description: item.description,
				idItem: orderItem.idItem,
				price: orderItem.price,
				quantity: orderItem.quantity,
			};
		});

		await prisma.orderProjection.create({
			data: {
				code: order.code,
				cpf: order.cpf.value,
				date: order.date,
				destination: order.destination,
				total: order.getTotal(),
				status: order.getStatus(),
				couponCode: order.getCoupon()?.code,
				orderItems: orderItemsProjection,
			},
		});
	}
}
