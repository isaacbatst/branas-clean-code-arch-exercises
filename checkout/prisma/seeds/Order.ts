import {OrderRequestStatuses, OrderStatuses} from '@prisma/client';
import prisma from '../../src/infra/persistence/prisma/prisma';

export const seedOrders = async () => {
	const orderData = {
		code: '202200000001',
		cpf: '317.153.361-86',
		destination: '71692-404',
		date: new Date('2022-01-01'),
		total: 7070.38,
		status: OrderStatuses.waitingPayment,
		orderItems: [
			{
				itemId: 1,
				price: 1000,
				shipping: 10,
				quantity: 2,
				description: 'Guitarra',
			},
			{
				itemId: 2,
				price: 5000,
				quantity: 1,
				shipping: 10,
				description: 'Amplificador',
			},
		],
	};

	console.log('Seeding order request...');

	await prisma.orderRequest.create({
		data: {
			code: orderData.code,
			status: OrderRequestStatuses.waitingToProcess,
			date: orderData.date,
		},
	});

	console.log('Seeding orders...');

	await prisma.order.create({
		data: {
			...orderData,
			orderItems: {
				createMany: {
					data: orderData.orderItems.map(item => ({
						itemId: item.itemId,
						price: item.price,
						quantity: item.quantity,
						shipping: item.shipping,
					})),
				},
			},
		},
	});

	console.log('Seeding order projections...');

	await prisma.orderProjection.create({
		data: orderData,
	});
};
