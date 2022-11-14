import type {SimulateShipping} from '../../application/usecases/SimulateShipping';
import {ValidationError} from '../../domain/errors/ValidationError';
import type {HttpMethod, HttpServer} from '../http/HttpServer';

export class SimulateShippingController {
	public static	register(
		method: HttpMethod,
		path: string,
		httpServer: HttpServer,
		simulateShipping: SimulateShipping,
	) {
		httpServer.on(method, path, async req => {
			const {orderItems, destination} = req.body;

			if (!destination || typeof destination !== 'string') {
				throw new ValidationError('INVALID_DESTINATION');
			}

			if (!Array.isArray(orderItems)) {
				throw new ValidationError('INVALID_ORDER_ITEMS');
			}

			const shipping = await simulateShipping.execute({
				destination,
				orderItems,
			});

			return {
				statusCode: 200,
				body: {
					shipping,
				},
			};
		});
	}
}
