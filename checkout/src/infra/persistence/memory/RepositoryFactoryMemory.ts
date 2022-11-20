import type {CouponRepository} from '../../../application/repositories/CouponRepository';
import type {OrderRepository} from '../../../application/repositories/OrderRepository';
import type {RepositoryFactory} from '../../../application/repositories/RepositoryFactory';
import {CouponRepositoryMemory} from './CouponRepositoryMemory';
import {OrderRepositoryMemory} from './OrderRepositoryMemory';

export class RepositoryFactoryMemory implements RepositoryFactory {
	readonly couponRepository: CouponRepository;
	readonly orderRepository: OrderRepository;

	constructor() {
		this.couponRepository = new CouponRepositoryMemory();
		this.orderRepository = new OrderRepositoryMemory();
	}
}
