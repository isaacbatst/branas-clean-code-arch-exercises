import type {Checkout} from '../../application/usecases/Checkout';
import {ValidationError} from '../../domain/errors/ValidationError';
import type {HttpMethod, HttpServer} from '../http/HttpServer';

export class CheckoutController {
	public static register(
		method: HttpMethod,
		path: string,
		server: HttpServer,
		checkout: Checkout,
	) {
		server.on(method, path, async req => {
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

			const {code, total} = await checkout.execute({
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
