import type {CouponRepository} from '../../../application/repositories/CouponRepository';
import type {OrderRepository} from '../../../application/repositories/OrderRepository';
import type {RepositoryFactory} from '../../../application/repositories/RepositoryFactory';
import {CouponRepositoryPrisma} from './CouponRepositoryPrisma';
import {OrderRepositoryPrisma} from './OrderRepositoryPrisma';

export class RepositoryFactoryPrisma implements RepositoryFactory {
	readonly couponRepository: CouponRepository;
	readonly orderRepository: OrderRepository;

	constructor() {
		this.couponRepository = new CouponRepositoryPrisma();
		this.orderRepository = new OrderRepositoryPrisma();
	}
}
