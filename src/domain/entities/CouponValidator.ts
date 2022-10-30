import type Coupon from './Coupon';

export class CouponValidator {
	static validate(coupon: Coupon, date: Date) {
		if (coupon.expirationDate.getTime() < date.getTime()) {
			throw new Error('Cupom expirado');
		}
	}
}
