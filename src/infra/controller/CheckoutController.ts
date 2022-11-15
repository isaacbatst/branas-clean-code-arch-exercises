import type {Checkout} from '../../application/usecases/Checkout';
import {ValidationError} from '../../domain/errors/ValidationError';
import type {HttpRequest} from '../http/HttpServer';
import {Controller} from './Controller';

export class CheckoutController extends Controller {
	constructor(
		private readonly checkout: Checkout,
	) {
		super();
	}

	protected handler = async (req: HttpRequest) => {
		const {cpf, items, coupon, destination} = req.body;
		if (typeof cpf !== 'string') {
			throw new ValidationError('INVALID_CPF');
		}

		if (!Array.isArray(items)) {
			throw new ValidationError('INVALID_ITEMS');
		}

		if (typeof coupon !== 'string' && typeof coupon !== 'undefined') {
			throw new ValidationError('INVALID_COUPON');
		}

		if (!destination || typeof destination !== 'string') {
			throw new ValidationError('INVALID_DESTINATION');
		}

		const {code, total} = await this.checkout.execute({
			cpf,
			items,
			coupon,
			destination,
		});

		return {
			statusCode: 200,
			body: {
				code, total,
			},
		};
	};
}
