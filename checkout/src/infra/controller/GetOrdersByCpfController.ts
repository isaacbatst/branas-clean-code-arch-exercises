import type {GetOrdersByCpf} from '../../application/queries/GetOrdersByCpf';
import {ValidationError} from '../../domain/errors/ValidationError';
import type {HttpRequestHandler} from '../http/HttpServer';
import {HttpController} from './HttpController';

export class GetOrdersByCpfController extends HttpController {
	constructor(
		private readonly getOrdersByCode: GetOrdersByCpf,
	) {
		super();
	}

	protected handler: HttpRequestHandler = async req => {
		const {cpf} = req.body;

		if (!cpf || typeof cpf !== 'string') {
			throw new ValidationError('INVALID_CPF');
		}

		const orders = await this.getOrdersByCode.query(cpf);

		return {
			statusCode: 200,
			body: {
				orders,
			},
		};
	};
}
