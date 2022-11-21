import type {CouponRepository} from '../../../application/repositories/CouponRepository';
import type {OrderRepository} from '../../../application/repositories/OrderRepository';
import type {RepositoryFactory} from '../../../application/repositories/RepositoryFactory';
import type {RequestedOrderRepository} from '../../../application/repositories/RequestedOrderRepository';
import {CouponRepositoryPrisma} from './CouponRepositoryPrisma';
import {OrderRepositoryPrisma} from './OrderRepositoryPrisma';
import {RequestedOrderRepositoryPrisma} from './RequestedOrderRepositoryPrisma';

export class RepositoryFactoryPrisma implements RepositoryFactory {
	readonly couponRepository: CouponRepository;
	readonly orderRepository: OrderRepository;
	readonly requestedOrderRepository: RequestedOrderRepository;

	constructor() {
		this.couponRepository = new CouponRepositoryPrisma();
		this.orderRepository = new OrderRepositoryPrisma();
		this.requestedOrderRepository = new RequestedOrderRepositoryPrisma();
	}
}
