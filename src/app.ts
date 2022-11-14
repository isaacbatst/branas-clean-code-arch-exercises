import {Checkout} from './application/usecases/Checkout';
import {CheckoutController} from './infra/controller/CheckoutController';
import {HttpServerExpressAdapter} from './infra/http/HttpServerExpressAdapter';
import {ErrorMiddleware} from './infra/middleware/ErrorMiddleware';
import {CouponRepositoryPrisma} from './infra/persistence/prisma/CouponRepositoryPrisma';
import {ItemRepositoryPrisma} from './infra/persistence/prisma/ItemRepositoryPrisma';
import {OrderRepositoryPrisma} from './infra/persistence/prisma/OrderRepositoryPrisma';
import {ValidateCouponController} from './infra/controller/ValidateCouponController';
import {SimulateShippingController} from './infra/controller/SimulateShippingController';
import {SimulateShipping} from './application/usecases/SimulateShipping';
import {ValidateCoupon} from './application/usecases/ValidateCoupon';
import {DistanceGatewayImpl} from './infra/gateway/DistanceGatewayImpl';
import {CityRepositoryPrisma} from './infra/persistence/prisma/CityRepositoryPrisma';
import {AddressGatewayImpl} from './infra/gateway/AddressGatewayImpl';
import type {AddressGateway} from './application/gateway/AddressGateway';

export class App {
	readonly httpServer = new HttpServerExpressAdapter();

	constructor(addressGateway: AddressGateway) {
		const couponRepository = new CouponRepositoryPrisma();
		const orderRepository = new OrderRepositoryPrisma();
		const itemRepository = new ItemRepositoryPrisma();
		const cityRepository = new CityRepositoryPrisma();
		const distanceGateway = new DistanceGatewayImpl(addressGateway, cityRepository);
		const checkout = new Checkout(orderRepository, couponRepository, itemRepository, distanceGateway);
		const validateCoupon = new ValidateCoupon(couponRepository);
		const simulateShipping = new SimulateShipping(itemRepository, distanceGateway);

		const orderController = new CheckoutController(this.httpServer, checkout);
		orderController.register();
		const validateCouponController = new ValidateCouponController(this.httpServer, validateCoupon);
		validateCouponController.register();
		const simulateShippingController = new SimulateShippingController(this.httpServer, simulateShipping);
		simulateShippingController.register();

		this.httpServer.useErrorMiddleware(ErrorMiddleware.handle);
	}
}
