import type {CouponRepository} from '../../../application/repositories/CouponRepository';
import type Coupon from '../../../domain/entities/Coupon';
import {NotFoundError} from '../../../domain/errors/NotFoundError';

export class CouponRepositoryMemory implements CouponRepository {
	coupons: Coupon[] = [];

	async getByCode(code: string): Promise<Coupon> {
		const coupon = this.coupons.find(coupon => coupon.code === code);

		if (!coupon) {
			throw new NotFoundError('Cupom não encontrado');
		}

		return coupon;
	}

	async save(coupon: Coupon): Promise<void> {
		this.coupons.push(coupon);
	}
}
