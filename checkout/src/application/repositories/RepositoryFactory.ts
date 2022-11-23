import type {CouponRepository} from './CouponRepository';
import type {OrderProjectionRepository} from './OrderProjectionRepository';
import type {OrderRepository} from './OrderRepository';
import type {OrderRequestRepository} from './OrderRequestRepository';

export type RepositoryFactory = {
	orderRepository: OrderRepository;
	couponRepository: CouponRepository;
	orderRequestRepository: OrderRequestRepository;
	orderProjectionRepository: OrderProjectionRepository;
};
