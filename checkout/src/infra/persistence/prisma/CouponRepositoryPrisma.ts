import type {CouponRepository} from '../../../application/repositories/CouponRepository';
import Coupon from '../../../domain/entities/Coupon';
import {NotFoundError} from '../../../domain/errors/NotFoundError';
import prisma from './prisma';

export class CouponRepositoryPrisma implements CouponRepository {
	async getByCode(code: string): Promise<Coupon> {
		const coupon = await prisma.coupon.findUnique({
			where: {code},
		});

		if (!coupon) {
			throw new NotFoundError('Cupom não encontrado');
		}

		return new Coupon(coupon.code, coupon.percentage, coupon.expireDate);
	}

	async save(coupon: Coupon): Promise<void> {
		await prisma.coupon.create({
			data: {
				code: coupon.code,
				expireDate: coupon.expirationDate,
				percentage: coupon.percentage,
			},
		});
	}
}
