import type {SaveStockEntry} from '../../application/usecases/SaveStockEntry';
import {ValidationError} from '../../domain/errors/ValidationError';
import type {HttpRequestHandler} from '../http/HttpServer';
import {Controller} from './Controller';

export class SaveStockEntryController extends Controller {
	constructor(
		private readonly saveStockEntry: SaveStockEntry,
	) {
		super();
	}

	protected handler: HttpRequestHandler = async req => {
		const {idItem, quantity, operation} = req.body;

		if (!idItem || typeof idItem !== 'number') {
			throw new ValidationError('INVALID_ID_ITEM');
		}

		if (!quantity || typeof quantity !== 'number') {
			throw new ValidationError('INVALID_QUANTITY');
		}

		if (!operation || typeof operation !== 'string') {
			throw new ValidationError('INVALID_OPERATION');
		}

		const {id} = await this.saveStockEntry.execute(idItem, quantity, operation);

		return {
			statusCode: 201,
			body: {
				id,
			},
		};
	};
}
