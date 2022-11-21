import type {QueueGateway} from './application/gateway/QueueGateway';
import {DecrementStock} from './application/usecases/DecrementStock';
import {DecrementStockController} from './infra/controller/SaveStockEntryController';
import {HttpServerExpressAdapter} from './infra/http/HttpServerExpressAdapter';
import {ErrorMiddleware} from './infra/middleware/ErrorMiddleware';
import {StockEntryRepositoryPrisma} from './infra/persistence/prisma/StockEntryRepositoryPrisma';

export class App {
	readonly httpServer = new HttpServerExpressAdapter();

	constructor(
		queueGateway: QueueGateway,
	) {
		const stockEntryRepository = new StockEntryRepositoryPrisma();
		const decrementStock = new DecrementStock(stockEntryRepository);
		const decrementStockController = new DecrementStockController(decrementStock);

		decrementStockController.register('orderPlaced', 'orderPlaced.decrementStock', queueGateway);

		this.httpServer.useErrorMiddleware(ErrorMiddleware.handle);
	}
}
