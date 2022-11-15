import type Coupon from './Coupon';

export class CouponValidator {
	static validate(coupon: Coupon, date: Date): boolean {
		return coupon.expirationDate.getTime() > date.getTime();
	}
}
