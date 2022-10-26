import type Coupon from '../../entities/Coupon';
import type {CouponRepository} from '../interfaces/CouponRepository';

export class CouponRepositoryMemory implements CouponRepository {
	coupons: Coupon[] = [];

	async getByCode(code: string): Promise<Coupon | undefined> {
		return this.coupons.find(coupon => coupon.code === code);
	}

	async save(coupon: Coupon): Promise<void> {
		this.coupons.push(coupon);
	}
}
