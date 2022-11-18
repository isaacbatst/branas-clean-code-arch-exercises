import type {GetItems} from '../../application/queries/GetItems';
import type {HttpRequestHandler} from '../http/HttpServer';
import {Controller} from './Controller';

export class GetItemsController extends Controller {
	constructor(
		private readonly getItems: GetItems,
	) {
		super();
	}

	protected handler: HttpRequestHandler = async req => {
		const items = await this.getItems.query();

		return {
			statusCode: 200,
			body: {
				items,
			},
		};
	};
}
