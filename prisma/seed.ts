import {seedCities} from './seeds/City';
import {seedCoupons} from './seeds/Coupon';
import {seedItems} from './seeds/Item';
import {seedStates} from './seeds/State';

const seed = async () => {
	console.log('Starting seed...');

	await seedItems();
	await seedCoupons();
	await seedStates();
	await seedCities();
};

seed()
	.catch(err => {
		console.log('Error while seeding');
		console.log(err);
	});
