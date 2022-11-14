import type {ValidateCoupon} from '../../application/usecases/ValidateCoupon';
import {ValidationError} from '../../domain/errors/ValidationError';
import type {HttpMethod, HttpServer} from '../http/HttpServer';

export class ValidateCouponController {
	public static register(
		method: HttpMethod,
		path: string,
		httpServer: HttpServer,
		validateCoupon: ValidateCoupon,
	) {
		httpServer.on(method, path, async req => {
			const {coupon} = req.body;

			if (!coupon || typeof coupon !== 'string') {
				throw new ValidationError('EMPTY_COUPON');
			}

			const isValid = await validateCoupon.execute(coupon);

			return {
				statusCode: 200,
				body: {
					valid: isValid,
				},
			};
		});
	}
}
