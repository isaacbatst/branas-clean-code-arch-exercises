import type {RequestCheckout} from '../../application/usecases/RequestCheckout';
import {ValidationError} from '../../domain/errors/ValidationError';
import type {HttpRequestHandler} from '../http/HttpServer';
import {HttpController} from './HttpController';

export class RequestCheckoutController extends HttpController {
	constructor(
		private readonly requestCheckout: RequestCheckout,
	) {
		super();
	}

	protected handler: HttpRequestHandler = async req => {
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

		await this.requestCheckout.execute({
			cpf,
			destination,
			items,
			coupon,
		});

		return {
			statusCode: 200,
		};
	};
}
