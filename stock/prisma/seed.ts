import {seedStockEntries} from './seeds/StockEntry';

const seed = async () => {
	console.log('Starting seed...');
	await seedStockEntries();
};

seed()
	.catch(err => {
		console.log('Error while seeding');
		console.log(err);
	});
