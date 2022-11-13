import type {SimulateShipping} from '../../application/SimulateShipping';
import {ValidationError} from '../../domain/errors/ValidationError';
import type {HttpServer} from '../http/HttpServer';

export class SimulateShippingController {
	constructor(
		private readonly httpServer: HttpServer,
		private readonly simulateShipping: SimulateShipping,
	) {}

	register() {
		this.httpServer.on('post', '/simulate/shipping', async req => {
			const orderItems = req.body;

			if (!Array.isArray(orderItems)) {
				throw new ValidationError('INVALID_ORDER_ITEMS');
			}

			const shipping = await this.simulateShipping.execute(orderItems);

			return {
				statusCode: 200,
				body: {
					shipping,
				},
			};
		});
	}
}
