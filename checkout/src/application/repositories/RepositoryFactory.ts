import type {CouponRepository} from './CouponRepository';
import type {OrderRepository} from './OrderRepository';

export type RepositoryFactory = {
	orderRepository: OrderRepository;
	couponRepository: CouponRepository;
};
