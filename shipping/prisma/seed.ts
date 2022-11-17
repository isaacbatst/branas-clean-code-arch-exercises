import {seedCities} from './seeds/City';
import {seedStates} from './seeds/State';

const seed = async () => {
	console.log('Starting seed...');

	await seedStates();
	await seedCities();
};

seed()
	.catch(err => {
		console.log('Error while seeding');
		console.log(err);
	});
