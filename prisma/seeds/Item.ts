import prisma from '../../src/infra/persistence/prisma/prisma';

export const seedItems = async () => {
	console.log('Seeding items...');

	await prisma.item.createMany({
		data: [
			{
				description: 'Guitarra',
				depth: 10,
				height: 100,
				width: 30,
				price: 1000,
				weight: 3,
			},
			{
				description: 'Amplificador',
				depth: 8,
				height: 15,
				width: 14,
				price: 5000,
				weight: 1,
			},
		],
	});
};
