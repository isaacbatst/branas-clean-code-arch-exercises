import type {Preview} from '../../application/usecases/Preview';
import {ValidationError} from '../../domain/errors/ValidationError';
import type {HttpRequestHandler} from '../http/HttpServer';
import {Controller} from './Controller';

export class PreviewController extends Controller {
	constructor(
		private readonly preview: Preview,
	) {
		super();
	}

	protected handler: HttpRequestHandler = async req => {
		const {items, coupon, destination} = req.body;
		if (!Array.isArray(items)) {
			throw new ValidationError('INVALID_ITEMS');
		}

		if (typeof coupon !== 'string' && typeof coupon !== 'undefined') {
			throw new ValidationError('INVALID_COUPON');
		}

		if (!destination || typeof destination !== 'string') {
			throw new ValidationError('INVALID_DESTINATION');
		}

		const {total} = await this.preview.execute({
			destination,
			items,
			coupon,
		});

		return {
			statusCode: 200,
			body: {
				total,
			},
		};
	};
}
