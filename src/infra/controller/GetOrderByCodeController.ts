import type {GetOrderByCode} from '../../application/queries/GetOrderByCode';
import {ValidationError} from '../../domain/errors/ValidationError';
import type {HttpMethod, HttpServer} from '../http/HttpServer';

export class GetOrderByCodeController {
	public static register(
		method: HttpMethod,
		path: string,
		httpServer: HttpServer,
		getOrderByCode: GetOrderByCode,
	) {
		httpServer.on(method, path, async req => {
			const {code} = req.params;

			if (!code || typeof code !== 'string') {
				throw new ValidationError('INVALID_CODE');
			}

			const order = await getOrderByCode.query(code);
			return {
				statusCode: 200,
				body: order,
			};
		});
	}
}
