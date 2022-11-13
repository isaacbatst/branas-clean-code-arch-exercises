import {CouponValidator} from '../domain/entities/CouponValidator';
import {NotFoundError} from '../domain/errors/NotFoundError';
import type {CouponRepository} from '../domain/repositories/CouponRepository';

export class ValidateCoupon {
	constructor(
		private readonly couponRepository: CouponRepository,
	) {}

	async execute(couponCode: string): Promise<boolean> {
		const coupon = await this.couponRepository.getByCode(couponCode);

		if (!coupon) {
			throw new NotFoundError('Cupom não encontrado');
		}

		return CouponValidator.validate(coupon, new Date());
	}
}
