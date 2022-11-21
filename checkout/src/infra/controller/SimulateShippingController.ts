import type {SimulateShipping} from '../../application/usecases/SimulateShipping';
import {ValidationError} from '../../domain/errors/ValidationError';
import type {HttpRequestHandler} from '../http/HttpServer';
import {HttpController} from './HttpController';

export class SimulateShippingController extends HttpController {
	constructor(
		private readonly simulateShipping: SimulateShipping,
	) {
		super();
	}

	protected handler: HttpRequestHandler = async req => {
		const {orderItems, destination} = req.body;

		if (!destination || typeof destination !== 'string') {
			throw new ValidationError('INVALID_DESTINATION');
		}

		if (!Array.isArray(orderItems)) {
			throw new ValidationError('INVALID_ORDER_ITEMS');
		}

		const shipping = await this.simulateShipping.execute({
			destination,
			orderItems,
		});

		return {
			statusCode: 200,
			body: {
				shipping,
			},
		};
	};
}
