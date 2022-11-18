import {GetItem} from './application/queries/GetItem';
import {GetItemController} from './infra/controller/GetItemController';
import {HttpServerExpressAdapter} from './infra/http/HttpServerExpressAdapter';
import {ErrorMiddleware} from './infra/middleware/ErrorMiddleware';

export class App {
	readonly httpServer = new HttpServerExpressAdapter();

	constructor() {
		const getItem = new GetItem();

		const getItemController = new GetItemController(getItem);

		getItemController.register('get', '/item/:id', this.httpServer);

		this.httpServer.useErrorMiddleware(ErrorMiddleware.handle);
	}
}
