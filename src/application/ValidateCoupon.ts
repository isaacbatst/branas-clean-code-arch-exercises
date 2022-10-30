import {CouponValidator} from '../domain/entities/CouponValidator';
import type {CouponRepository} from '../domain/repositories/CouponRepository';

export class ValidateCoupon {
	constructor(
		private readonly couponRepository: CouponRepository,
	) {}

	async execute(couponCode: string): Promise<boolean> {
		const coupon = await this.couponRepository.getByCode(couponCode);

		if (!coupon) {
			throw new Error('Cupom não encontrado');
		}

		CouponValidator.validate(coupon, new Date());

		return true;
	}
}
