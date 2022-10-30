import type Order from '../../entities/Order';
import prisma from '../../infra/prisma';
import type {OrderRepository} from '../interfaces/OrderRepository';

export class OrderRepositoryPrisma implements OrderRepository {
	async getCount(): Promise<number> {
		return prisma.order.count();
	}

	async save(order: Order): Promise<void> {
		await prisma.order.create({
			data: {
				cpf: order.cpf.value,
				date: order.date,
				code: order.code,
				total: order.getTotal(),
				coupon: {
					connect: {
						code: order.getCoupon()?.code,
					},
				},
				orderItems: {
					create: order.orderItems.map(item => ({
						item: {
							connect: {
								id: item.idItem,
							},
						},
						price: item.price,
						quantity: item.quantity,
					})),
				},
			},
		});
	}
}
