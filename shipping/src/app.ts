import type {AddressGateway} from './application/gateway/AddressGateway';
import {CalculateShipping} from './application/usecases/CalculateShipping';
import {CalculateShippingController} from './infra/controller/CalculateShippingController';
import {HttpServerExpressAdapter} from './infra/http/HttpServerExpressAdapter';
import {ErrorMiddleware} from './infra/middleware/ErrorMiddleware';
import {CityRepositoryPrisma} from './infra/persistence/prisma/CityRepositoryPrisma';

export class App {
	readonly httpServer = new HttpServerExpressAdapter();

	constructor(addressGateway: AddressGateway) {
		const cityRepository = new CityRepositoryPrisma();
		const calculateShipping = new CalculateShipping(addressGateway, cityRepository);

		const calculateShippingController = new CalculateShippingController(calculateShipping);

		calculateShippingController.register('post', '/calculate/shipping', this.httpServer);

		this.httpServer.useErrorMiddleware(ErrorMiddleware.handle);
	}
}
