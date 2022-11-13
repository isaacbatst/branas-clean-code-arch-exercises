import prisma from '../../src/infra/persistence/prisma/prisma';

export const seedCoupons = async () => {
	console.log('Seeding coupons');

	const tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);

	const yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 1);

	await prisma.coupon.createMany({
		data: [
			{
				code: 'VALE20',
				expireDate: tomorrow,
				percentage: 20,
			},
			{
				code: 'VALE40',
				expireDate: yesterday,
				percentage: 40,
			},
		],
	});
};
