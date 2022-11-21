import type {CouponRepository} from '../../../application/repositories/CouponRepository';
import type {OrderProjectionRepository} from '../../../application/repositories/OrderProjectionRepository';
import type {OrderRepository} from '../../../application/repositories/OrderRepository';
import type {RepositoryFactory} from '../../../application/repositories/RepositoryFactory';
import type {OrderRequestRepository} from '../../../application/repositories/RequestedOrderRepository';
import {CouponRepositoryPrisma} from './CouponRepositoryPrisma';
import {OrderProjectionRepositoryPrisma} from './OrderProjectionRepositoryPrisma';
import {OrderRepositoryPrisma} from './OrderRepositoryPrisma';
import {OrderRequestRepositoryPrisma} from './RequestedOrderRepositoryPrisma';

export class RepositoryFactoryPrisma implements RepositoryFactory {
	readonly couponRepository: CouponRepository;
	readonly orderRepository: OrderRepository;
	readonly orderRequestRepository: OrderRequestRepository;
	readonly orderProjectionRepository: OrderProjectionRepository;

	constructor() {
		this.couponRepository = new CouponRepositoryPrisma();
		this.orderRepository = new OrderRepositoryPrisma();
		this.orderRequestRepository = new OrderRequestRepositoryPrisma();
		this.orderProjectionRepository = new OrderProjectionRepositoryPrisma();
	}
}
