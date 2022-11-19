import {Decimal} from '@prisma/client/runtime';
import type {OrderRepository} from '../../../application/repositories/OrderRepository';
import Order from '../../../domain/entities/Order';
import {NotFoundError} from '../../../domain/errors/NotFoundError';
import prisma from './prisma';

export class OrderRepositoryPrisma implements OrderRepository {
	static toOrm(order: Order) {
		return {
			cpf: order.cpf.value,
			date: order.date,
			code: order.code,
			total: new Decimal(order.getTotal()),
			destination: order.destination,
			status: order.getStatus(),
		};
	}

	async getCount(): Promise<number> {
		return prisma.order.count();
	}

	async update(order: Order): Promise<void> {
		const prismaOrder = OrderRepositoryPrisma.toOrm(order);

		await prisma.order.update({
			data: prismaOrder,
			where: {
				code: prismaOrder.code,
			},
		});
	}

	async getByCode(code: string): Promise<Order> {
		const prismaOrder = await prisma.order.findUnique({
			where: {
				code,
			},
		});

		if (!prismaOrder) {
			throw new NotFoundError('Pedido não encontrado');
		}

		return new Order(
			prismaOrder.cpf,
			prismaOrder.date,
			prismaOrder.code,
			prismaOrder.destination,
			prismaOrder.status,
		);
	}

	async save(order: Order): Promise<void> {
		const prismaOrder = OrderRepositoryPrisma.toOrm(order);

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
				...prismaOrder,
				coupon,
				orderItems: {
					create: order.orderItems.map(item => ({
						itemId: item.idItem,
						price: item.price,
						quantity: item.quantity,
					})),
				},
			},
		});
	}
}
