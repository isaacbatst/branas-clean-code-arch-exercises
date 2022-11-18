import prisma from '../../src/infra/persistence/prisma/prisma';

export const seedItems = async () => {
	console.log('Seeding items...');

	await prisma.item.createMany({
		data: [
			{
				description: 'Guitarra',
				price: 1000,
			},
			{
				description: 'Amplificador',
				price: 5000,
			},
		],
	});
};
