import type {Checkout} from '../../application/usecases/Checkout';
import type {AppErrors} from '../../domain/errors/AppError';
import {AppError} from '../../domain/errors/AppError';
import {ValidationError} from '../../domain/errors/ValidationError';
import type {HttpServer} from '../http/HttpServer';

export class CheckoutController {
	constructor(
		readonly server: HttpServer,
		readonly checkout: Checkout,
	) {
	}

	public register() {
		this.server.on('post', '/checkout', async req => {
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
		});
	}
}
