import {CouponValidator} from '../../domain/entities/CouponValidator';
import {NotFoundError} from '../../domain/errors/NotFoundError';
import type {CouponRepository} from '../repositories/CouponRepository';
import type {RepositoryFactory} from '../repositories/RepositoryFactory';

export class ValidateCoupon {
	private readonly couponRepository: CouponRepository;
	constructor(
		repositoryFactory: RepositoryFactory,
	) {
		this.couponRepository = repositoryFactory.couponRepository;
	}

	async execute(couponCode: string): Promise<boolean> {
		const coupon = await this.couponRepository.getByCode(couponCode);

		if (!coupon) {
			throw new NotFoundError('Cupom não encontrado');
		}

		return CouponValidator.validate(coupon, new Date());
	}
}
