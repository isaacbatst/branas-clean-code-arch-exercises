import type {GetItems} from '../../application/queries/GetItems';
import {ValidationError} from '../../domain/errors/ValidationError';
import type {HttpRequestHandler} from '../http/HttpServer';
import {Controller} from './Controller';

export class GetItemsController extends Controller {
	constructor(
		private readonly getItems: GetItems,
	) {
		super();
	}

	protected handler: HttpRequestHandler = async req => {
		const {ids} = req.query;

		if (!ids || typeof ids !== 'string') {
			throw new ValidationError('Ids inválidos');
		}

		const idsArray = ids
			.split(',')
			.map(id => Number(id));

		const items = await this.getItems.query(idsArray);

		return {
			statusCode: 200,
			body: {
				items,
			},
		};
	};
}
