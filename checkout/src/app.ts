import type {ItemGateway} from './application/gateway/ItemGateway';
import type {ShippingGateway} from './application/gateway/ShippingGateway';
import type {StockGateway} from './application/gateway/StockGateway';
import {GetOrderByCode} from './application/queries/GetOrderByCode';
import {GetOrdersByCpf} from './application/queries/GetOrdersByCpf';
import {CancelOrder} from './application/usecases/CancelOrder';
import {Checkout} from './application/usecases/Checkout';
import {SimulateShipping} from './application/usecases/SimulateShipping';
import {ValidateCoupon} from './application/usecases/ValidateCoupon';
import {CancelOrderController} from './infra/controller/CancelOrderController';
import {CheckoutController} from './infra/controller/CheckoutController';
import {GetOrderByCodeController} from './infra/controller/GetOrderByCodeController';
import {GetOrdersByCpfController} from './infra/controller/GetOrdersByCpfController';
import {SimulateShippingController} from './infra/controller/SimulateShippingController';
import {ValidateCouponController} from './infra/controller/ValidateCouponController';
import {StockGatewayHttp} from './infra/gateway/StockGatewayHttp';
import {HttpServerExpressAdapter} from './infra/http/HttpServerExpressAdapter';
import {ErrorMiddleware} from './infra/middleware/ErrorMiddleware';
import {CouponRepositoryPrisma} from './infra/persistence/prisma/CouponRepositoryPrisma';
import {OrderProjectionRepositoryPrisma} from './infra/persistence/prisma/OrderProjectionRepositoryPrisma';
import {OrderRepositoryPrisma} from './infra/persistence/prisma/OrderRepositoryPrisma';

export class App {
	readonly httpServer = new HttpServerExpressAdapter();

	constructor(
		shippingGateway: ShippingGateway,
		itemGateway: ItemGateway,
		stockGateway: StockGateway,
	) {
		const couponRepository = new CouponRepositoryPrisma();
		const orderRepository = new OrderRepositoryPrisma();
		const orderProjectionRepository = new OrderProjectionRepositoryPrisma();
		const checkout = new Checkout(orderRepository, orderProjectionRepository, couponRepository, itemGateway, shippingGateway, stockGateway);
		const validateCoupon = new ValidateCoupon(couponRepository);
		const simulateShipping = new SimulateShipping(itemGateway, shippingGateway);
		const getOrderByCode = new GetOrderByCode();
		const getOrdersByCpf = new GetOrdersByCpf();
		const cancelOrder = new CancelOrder(orderRepository, stockGateway);

		const checkoutController = new CheckoutController(checkout);
		const validateCouponController = new ValidateCouponController(validateCoupon);
		const simulateShippingController = new SimulateShippingController(simulateShipping);
		const getOrderByCodeController = new GetOrderByCodeController(getOrderByCode);
		const getOrdersByCpfController = new GetOrdersByCpfController(getOrdersByCpf);
		const cancelOrderController = new CancelOrderController(cancelOrder);

		checkoutController.register('post', '/checkout', this.httpServer);
		validateCouponController.register('post', '/validate/coupon', this.httpServer);
		simulateShippingController.register('post', '/simulate/shipping', this.httpServer);
		getOrderByCodeController.register('get', '/order/:code', this.httpServer);
		getOrdersByCpfController.register('get', '/orders', this.httpServer);
		cancelOrderController.register('post', '/order/cancel/:code', this.httpServer);

		this.httpServer.useErrorMiddleware(ErrorMiddleware.handle);
	}
}
