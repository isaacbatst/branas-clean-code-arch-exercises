import {GetItem} from './application/queries/GetItem';
import {GetItems} from './application/queries/GetItems';
import {GetItemController} from './infra/controller/GetItemController';
import {GetItemsController} from './infra/controller/GetItemsController';
import {HttpServerExpressAdapter} from './infra/http/HttpServerExpressAdapter';
import {ErrorMiddleware} from './infra/middleware/ErrorMiddleware';

export class App {
	readonly httpServer = new HttpServerExpressAdapter();

	constructor() {
		const getItem = new GetItem();
		const getItems = new GetItems();

		const getItemController = new GetItemController(getItem);
		const getItemsController = new GetItemsController(getItems);

		getItemController.register('get', '/item/:id', this.httpServer);
		getItemsController.register('get', '/items', this.httpServer);

		this.httpServer.useErrorMiddleware(ErrorMiddleware.handle);
	}
}
