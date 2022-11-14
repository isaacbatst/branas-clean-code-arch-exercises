import type {OrderRepository} from '../../../application/repositories/OrderRepository';
import type Order from '../../../domain/entities/Order';
import prisma from './prisma';

export class OrderRepositoryPrisma implements OrderRepository {
	async getCount(): Promise<number> {
		return prisma.order.count();
	}

	async save(order: Order): Promise<void> {
		let coupon;

		if (order.getCoupon()) {
			coupon = {
				connect: {
					code: order.getCoupon()?.code,
				},
			};
		}

		await prisma.order.create({
			data: {
				cpf: order.cpf.value,
				date: order.date,
				code: order.code,
				total: order.getTotal(),
				coupon,
				destination: order.destination,
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
