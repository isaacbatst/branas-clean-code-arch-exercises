import {seedCoupons} from './seeds/Coupon';
import {seedItems} from './seeds/Item';
import {seedOrders} from './seeds/Order';

const seed = async () => {
	console.log('Starting seed...');

	await seedItems();
	await seedCoupons();
	await seedOrders();
};

seed()
	.catch(err => {
		console.log('Error while seeding');
		console.log(err);
	});
