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
import {GetOrderByCodeController} from './infra/controller/GetOrderByCodeController';
import {GetOrderByCode} from './application/queries/GetOrderByCode';
import {GetOrdersByCpfController} from './infra/controller/GetOrdersByCpfController';
import {GetOrdersByCpf} from './application/queries/GetOrdersByCpf';

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
		const getOrderByCode = new GetOrderByCode();
		const getOrdersByCpf = new GetOrdersByCpf();

		const checkoutController = new CheckoutController(checkout);
		const validateCouponController = new ValidateCouponController(validateCoupon);
		const simulateShippingController = new SimulateShippingController(simulateShipping);
		const getOrderByCodeController = new GetOrderByCodeController(getOrderByCode);
		const getOrdersByCpfController = new GetOrdersByCpfController(getOrdersByCpf);

		checkoutController.register('post', '/checkout', this.httpServer);
		validateCouponController.register('post', '/validate/coupon', this.httpServer);
		simulateShippingController.register('post', '/simulate/shipping', this.httpServer);
		getOrderByCodeController.register('get', '/order/:code', this.httpServer);
		getOrdersByCpfController.register('get', '/orders', this.httpServer);

		this.httpServer.useErrorMiddleware(ErrorMiddleware.handle);
	}
}
