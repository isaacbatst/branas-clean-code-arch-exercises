import type {CouponRepository} from '../../../application/repositories/CouponRepository';
import type {OrderRepository} from '../../../application/repositories/OrderRepository';
import type {RepositoryFactory} from '../../../application/repositories/RepositoryFactory';
import type {RequestedOrderRepository} from '../../../application/repositories/RequestedOrderRepository';
import {CouponRepositoryMemory} from './CouponRepositoryMemory';
import {OrderRepositoryMemory} from './OrderRepositoryMemory';
import {RequestedOrderRepositoryMemory} from './RequestedOrderRepositoryMemory';

export class RepositoryFactoryMemory implements RepositoryFactory {
	readonly couponRepository: CouponRepository;
	readonly orderRepository: OrderRepository;
	readonly requestedOrderRepository: RequestedOrderRepository;

	constructor() {
		this.couponRepository = new CouponRepositoryMemory();
		this.orderRepository = new OrderRepositoryMemory();
		this.requestedOrderRepository = new RequestedOrderRepositoryMemory();
	}
}
