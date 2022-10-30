import type {Checkout} from '../../application/Checkout';
import {ValidationError} from '../../domain/errors/ValidationError';
import type {HttpServer} from '../http/HttpServer';

export class OrderController {
	constructor(
		readonly server: HttpServer,
		readonly checkout: Checkout,
	) {
		this.onCheckout();
	}

	private onCheckout() {
		this.server.on('post', 'checkout', async req => {
			try {
				const {cpf, items, coupon} = req.body;
				if (typeof cpf !== 'string') {
					throw new ValidationError('INVALID_CPF');
				}

				if (!Array.isArray(items)) {
					throw new ValidationError('INVALID_ITEMS');
				}

				if (typeof coupon !== 'string') {
					throw new ValidationError('INVALID_COUPON');
				}

				const {code, total} = await this.checkout.execute({
					cpf,
					items,
					coupon,
				});

				return {
					statusCode: 200,
					body: {
						code, total,
					},
				};
			} catch (error: unknown) {
				if (error instanceof ValidationError) {
					return {
						statusCode: 400,
						body: {
							message: error.message,
						},
					};
				}

				return {
					statusCode: 500,
				};
			}
		});
	}
}
