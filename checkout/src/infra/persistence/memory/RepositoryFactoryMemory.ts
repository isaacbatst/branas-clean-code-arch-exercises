import type {CouponRepository} from '../../../application/repositories/CouponRepository';
import type {OrderProjectionRepository} from '../../../application/repositories/OrderProjectionRepository';
import type {OrderRepository} from '../../../application/repositories/OrderRepository';
import type {RepositoryFactory} from '../../../application/repositories/RepositoryFactory';
import type {OrderRequestRepository} from '../../../application/repositories/RequestedOrderRepository';
import {CouponRepositoryMemory} from './CouponRepositoryMemory';
import {OrderProjectionRepositoryMemory} from './OrderProjectionRepositoryMemory';
import {OrderRepositoryMemory} from './OrderRepositoryMemory';
import {RequestedOrderRepositoryMemory} from './RequestedOrderRepositoryMemory';

export class RepositoryFactoryMemory implements RepositoryFactory {
	readonly couponRepository: CouponRepository;
	readonly orderRepository: OrderRepository;
	readonly orderRequestRepository: OrderRequestRepository;
	readonly orderProjectionRepository: OrderProjectionRepository;

	constructor() {
		this.couponRepository = new CouponRepositoryMemory();
		this.orderRepository = new OrderRepositoryMemory();
		this.orderRequestRepository = new RequestedOrderRepositoryMemory();
		this.orderProjectionRepository = new OrderProjectionRepositoryMemory();
	}
}
