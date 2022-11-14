import type {ValidateCoupon} from '../../application/usecases/ValidateCoupon';
import {AppError} from '../../domain/errors/AppError';
import {ValidationError} from '../../domain/errors/ValidationError';
import type {HttpServer} from '../http/HttpServer';

export class ValidateCouponController {
	constructor(
		private readonly httpServer: HttpServer,
		private readonly validateCoupon: ValidateCoupon,
	) {}

	public register() {
		this.httpServer.on('post', '/validate/coupon', async req => {
			const {coupon} = req.body;

			if (!coupon || typeof coupon !== 'string') {
				throw new ValidationError('EMPTY_COUPON');
			}

			const isValid = await this.validateCoupon.execute(coupon);

			return {
				statusCode: 200,
				body: {
					valid: isValid,
				},
			};
		});
	}
}
