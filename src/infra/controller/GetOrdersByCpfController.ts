import type {GetOrdersByCpf} from '../../application/queries/GetOrdersByCpf';
import {ValidationError} from '../../domain/errors/ValidationError';
import type {HttpMethod, HttpServer} from '../http/HttpServer';

export class GetOrdersByCpfController {
	public static register(
		method: HttpMethod,
		path: string,
		httpServer: HttpServer,
		getOrdersByCode: GetOrdersByCpf,
	) {
		httpServer.on(method, path, async req => {
			const {cpf} = req.body;

			if (!cpf || typeof cpf !== 'string') {
				throw new ValidationError('INVALID_CPF');
			}

			const orders = await getOrdersByCode.query(cpf);

			return {
				statusCode: 200,
				body: {
					orders,
				},
			};
		});
	}
}
