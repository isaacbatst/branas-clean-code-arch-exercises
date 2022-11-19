import type Coupon from '../../domain/entities/Coupon';

export type CouponRepository = {
	getByCode(code: string): Promise<Coupon>;
	save(coupon: Coupon): Promise<void>;
};
