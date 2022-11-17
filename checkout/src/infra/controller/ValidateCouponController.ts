import type {ValidateCoupon} from '../../application/usecases/ValidateCoupon';
import {ValidationError} from '../../domain/errors/ValidationError';
import type {HttpRequestHandler} from '../http/HttpServer';
import {Controller} from './Controller';

export class ValidateCouponController extends Controller {
	constructor(
		private readonly validateCoupon: ValidateCoupon,
	) {
		super();
	}

	protected handler: HttpRequestHandler = async req => {
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
	};
}