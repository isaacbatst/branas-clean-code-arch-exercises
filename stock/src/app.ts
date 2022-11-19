import {SaveStockEntry} from './application/usecases/SaveStockEntry';
import {SaveStockEntryController} from './infra/controller/SaveStockEntryController';
import {HttpServerExpressAdapter} from './infra/http/HttpServerExpressAdapter';
import {ErrorMiddleware} from './infra/middleware/ErrorMiddleware';
import {StockEntryRepositoryPrisma} from './infra/persistence/prisma/StockEntryRepositoryPrisma';

export class App {
	readonly httpServer = new HttpServerExpressAdapter();

	constructor() {
		const stockEntryRepository = new StockEntryRepositoryPrisma();
		const saveStockEntry = new SaveStockEntry(stockEntryRepository);
		const saveStockEntryController = new SaveStockEntryController(saveStockEntry);

		saveStockEntryController.register('post', '/stock-entry', this.httpServer);

		this.httpServer.useErrorMiddleware(ErrorMiddleware.handle);
	}
}
