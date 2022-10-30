import Coupon from '../../entities/Coupon';
import prisma from '../../infra/prisma';
import type {CouponRepository} from '../interfaces/CouponRepository';

export class CouponRepositoryPrisma implements CouponRepository {
	async getByCode(code: string): Promise<Coupon | undefined> {
		const coupon = await prisma.coupon.findUnique({
			where: {code},
		});

		if (coupon) {
			return new Coupon(coupon.code, coupon.percentage, coupon.expireDate);
		}
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
