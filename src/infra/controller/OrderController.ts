import type {Checkout} from '../../application/Checkout';
import type {AppErrors} from '../../domain/errors/AppError';
import {AppError} from '../../domain/errors/AppError';
import {ValidationError} from '../../domain/errors/ValidationError';
import type {HttpServer} from '../http/HttpServer';

export class OrderController {
	static errorToStatusCode: Record<AppErrors, number> = {
		notFoundError: 404,
		validationError: 400,
	};

	constructor(
		readonly server: HttpServer,
		readonly checkout: Checkout,
	) {
	}

	public setupRoutes() {
		this.setupCheckout();
	}

	private setupCheckout() {
		this.server.on('post', '/checkout', async req => {
			try {
				const {cpf, items, coupon} = req.body;
				if (typeof cpf !== 'string') {
					throw new ValidationError('INVALID_CPF');
				}

				if (!Array.isArray(items)) {
					throw new ValidationError('INVALID_ITEMS');
				}

				if (typeof coupon !== 'string' && typeof coupon !== 'undefined') {
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
				if (error instanceof AppError) {
					return {
						statusCode: OrderController.errorToStatusCode[error.name],
						body: {
							message: error.message,
						},
					};
				}

				console.log(error);

				return {
					statusCode: 500,
				};
			}
		});
	}
}
