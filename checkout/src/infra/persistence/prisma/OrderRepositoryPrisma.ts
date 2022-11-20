import {Decimal} from '@prisma/client/runtime';
import type {OrderRepository} from '../../../application/repositories/OrderRepository';
import Coupon from '../../../domain/entities/Coupon';
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
			include: {
				orderItems: true,
				coupon: true,
			},
		});

		if (!prismaOrder) {
			throw new NotFoundError('Pedido não encontrado');
		}

		const order = new Order(
			prismaOrder.cpf,
			prismaOrder.date,
			prismaOrder.code,
			prismaOrder.destination,
			prismaOrder.status,
		);

		prismaOrder.orderItems.forEach(orderItem => {
			order.addItem(
				{
					idItem: orderItem.itemId,
					price: orderItem.price.toNumber(),
					quantity: orderItem.quantity,
					shipping: orderItem.shipping.toNumber(),
				},
			);
		});

		if (prismaOrder.coupon) {
			order.addCoupon(new Coupon(
				prismaOrder.coupon.code,
				prismaOrder.coupon.percentage,
				prismaOrder.coupon.expireDate,
			));
		}

		return order;
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
						shipping: item.shipping,
					})),
				},
			},
		});
	}
}
