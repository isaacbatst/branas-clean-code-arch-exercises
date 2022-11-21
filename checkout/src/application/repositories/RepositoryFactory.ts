import type {CouponRepository} from './CouponRepository';
import type {OrderRepository} from './OrderRepository';
import type {RequestedOrderRepository} from './RequestedOrderRepository';

export type RepositoryFactory = {
	orderRepository: OrderRepository;
	couponRepository: CouponRepository;
	requestedOrderRepository: RequestedOrderRepository;
};
