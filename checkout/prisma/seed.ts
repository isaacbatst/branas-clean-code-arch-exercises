import {seedCoupons} from './seeds/Coupon';
import {seedOrders} from './seeds/Order';

const seed = async () => {
	console.log('Starting seed...');

	await seedCoupons();
	await seedOrders();
};

seed()
	.catch(err => {
		console.log('Error while seeding');
		console.log(err);
	});
