import type {QueueGateway} from './application/gateway/QueueGateway';
import {DecrementStock} from './application/usecases/DecrementStock';
import {IncrementStock} from './application/usecases/IncrementStock';
import {DecrementStockController} from './infra/controller/DecrementStockController';
import {IncrementStockController} from './infra/controller/IncrementStockController';
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
		const incrementStock = new IncrementStock(stockEntryRepository);

		const decrementStockController = new DecrementStockController(decrementStock);
		const incrementStockController = new IncrementStockController(incrementStock);

		decrementStockController.register('orderPlaced', 'orderPlaced.decrementStock', queueGateway);
		incrementStockController.register('orderCanceled', 'orderCanceled.incrementStock', queueGateway);

		this.httpServer.useErrorMiddleware(ErrorMiddleware.handle);
	}
}
