import type {GetItem} from '../../application/queries/GetItem';
import {ValidationError} from '../../domain/errors/ValidationError';
import type {HttpRequestHandler} from '../http/HttpServer';
import {Controller} from './Controller';

export class GetItemController extends Controller {
	constructor(
		private readonly getItem: GetItem,
	) {
		super();
	}

	protected handler: HttpRequestHandler = async req => {
		const {id} = req.params;

		if (!id || typeof id !== 'string') {
			throw new ValidationError('ID inválido');
		}

		const item = await this.getItem.query(Number(id));

		return {
			statusCode: 200,
			body: item,
		};
	};
}
