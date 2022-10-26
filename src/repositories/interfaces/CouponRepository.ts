import type Coupon from '../../entities/Coupon';

export type CouponRepository = {
	getByCode(code: string): Promise<Coupon | undefined>;
	save(coupon: Coupon): Promise<void>;
};
