import prisma from '../../src/infra/persistence/prisma/prisma';

export const seedOrders = async () => {
	console.log('Seeding orders...');

	await prisma.order.create({
		data: {
			code: '202200000001',
			cpf: '317.153.361-86',
			destination: '71692-404',
			date: new Date(),
			total: 7070.38,
			orderItems: {
				createMany: {
					data: [
						{
							itemId: 1,
							price: 1000,
							quantity: 2,
						},
						{
							itemId: 2,
							price: 5000,
							quantity: 1,
						},
					],
				},
			},
		},
	});
};
