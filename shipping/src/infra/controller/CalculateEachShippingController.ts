import type {CalculateEachShipping} from '../../application/usecases/CalculateEachShipping';
import {ValidationError} from '../../domain/errors/ValidationError';
import type {HttpRequestHandler} from '../http/HttpServer';
import {Controller} from './Controller';

export class CalculateEachShippingController extends Controller {
	constructor(
		private readonly calculateEachShipping: CalculateEachShipping,
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

		const shippings = await this.calculateEachShipping.execute({
			destination,
			orderItems,
		});

		return {
			statusCode: 200,
			body: {
				shippings,
			},
		};
	};
}
