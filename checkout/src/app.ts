import type {GatewayFactory} from './application/gateway/GatewayFactory';
import {GetOrderByCode} from './application/queries/GetOrderByCode';
import {GetOrdersByCpf} from './application/queries/GetOrdersByCpf';
import {CancelOrder} from './application/usecases/CancelOrder';
import {Checkout} from './application/usecases/Checkout';
import {Preview} from './application/usecases/Preview';
import {RequestCheckout} from './application/usecases/RequestCheckout';
import {SimulateShipping} from './application/usecases/SimulateShipping';
import {ValidateCoupon} from './application/usecases/ValidateCoupon';
import {CancelOrderController} from './infra/controller/CancelOrderController';
import {CheckoutController} from './infra/controller/CheckoutController';
import {GetOrderByCodeController} from './infra/controller/GetOrderByCodeController';
import {GetOrdersByCpfController} from './infra/controller/GetOrdersByCpfController';
import {PreviewController} from './infra/controller/PreviewController';
import {RequestCheckoutController} from './infra/controller/RequestCheckoutController';
import {SimulateShippingController} from './infra/controller/SimulateShippingController';
import {ValidateCouponController} from './infra/controller/ValidateCouponController';
import {HttpServerExpressAdapter} from './infra/http/HttpServerExpressAdapter';
import {ErrorMiddleware} from './infra/middleware/ErrorMiddleware';
import {RepositoryFactoryPrisma} from './infra/persistence/prisma/RepositoryFactoryPrisma';

export class App {
	readonly httpServer = new HttpServerExpressAdapter();

	constructor(
		gatewayFactory: GatewayFactory,
	) {
		const repositoryFactory = new RepositoryFactoryPrisma();
		const checkout = new Checkout(repositoryFactory, gatewayFactory);
		const validateCoupon = new ValidateCoupon(repositoryFactory);
		const simulateShipping = new SimulateShipping(gatewayFactory);
		const getOrderByCode = new GetOrderByCode();
		const getOrdersByCpf = new GetOrdersByCpf();
		const cancelOrder = new CancelOrder(repositoryFactory, gatewayFactory);
		const preview = new Preview(repositoryFactory, gatewayFactory);
		const requestCheckout = new RequestCheckout(repositoryFactory, gatewayFactory);

		const checkoutController = new CheckoutController(checkout);
		const validateCouponController = new ValidateCouponController(validateCoupon);
		const simulateShippingController = new SimulateShippingController(simulateShipping);
		const getOrderByCodeController = new GetOrderByCodeController(getOrderByCode);
		const getOrdersByCpfController = new GetOrdersByCpfController(getOrdersByCpf);
		const cancelOrderController = new CancelOrderController(cancelOrder);
		const previewController = new PreviewController(preview);
		const requestCheckoutController = new RequestCheckoutController(requestCheckout);

		validateCouponController.register('post', '/validate/coupon', this.httpServer);
		simulateShippingController.register('post', '/simulate/shipping', this.httpServer);
		getOrderByCodeController.register('get', '/order/:code', this.httpServer);
		getOrdersByCpfController.register('get', '/orders', this.httpServer);
		cancelOrderController.register('post', '/order/cancel/:code', this.httpServer);
		previewController.register('post', '/preview', this.httpServer);
		requestCheckoutController.register('post', '/checkout', this.httpServer);
		this.httpServer.useErrorMiddleware(ErrorMiddleware.handle);

		checkoutController.register('orderRequested', 'orderRequested.checkout', gatewayFactory.queueGateway)
			.catch(err => {
				console.error('Error registering queue', err);
			});
	}
}
