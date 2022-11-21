import prisma from '../../src/infra/persistence/prisma/prisma';

export const seedStockEntries = async () => {
	console.log('Seeding stock entries...');

	await prisma.stockEntry.createMany({
		data: [
			{
				idItem: 1,
				operation: 'increment',
				quantity: 10,
			},
			{
				idItem: 2,
				operation: 'increment',
				quantity: 10,
			},
		],
	});
};
