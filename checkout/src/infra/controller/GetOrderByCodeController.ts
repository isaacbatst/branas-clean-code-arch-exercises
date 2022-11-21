import type {GetOrderByCode} from '../../application/queries/GetOrderByCode';
import {ValidationError} from '../../domain/errors/ValidationError';
import type {HttpMethod, HttpRequestHandler, HttpServer} from '../http/HttpServer';
import {HttpController} from './HttpController';

export class GetOrderByCodeController extends HttpController {
	constructor(
		private readonly getOrderByCode: GetOrderByCode,
	) {
		super();
	}

	protected handler: HttpRequestHandler = async req => {
		const {code} = req.params;

		if (!code || typeof code !== 'string') {
			throw new ValidationError('INVALID_CODE');
		}

		const order = await this.getOrderByCode.query(code);
		return {
			statusCode: 200,
			body: order,
		};
	};
}
