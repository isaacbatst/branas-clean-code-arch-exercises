import type {CalculateShipping} from '../../application/usecases/CalculateShipping';
import {ValidationError} from '../../domain/errors/ValidationError';
import type {HttpRequestHandler} from '../http/HttpServer';
import {Controller} from './Controller';

export class CalculateShippingController extends Controller {
	constructor(
		private readonly calculateShipping: CalculateShipping,
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

		const shipping = await this.calculateShipping.execute({
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
