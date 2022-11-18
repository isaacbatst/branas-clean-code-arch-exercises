import {seedItems} from './seeds/Item';

const seed = async () => {
	console.log('Starting seed...');

	await seedItems();
};

seed()
	.catch(err => {
		console.log('Error while seeding');
		console.log(err);
	});
