import type {GatewayFactory} from './application/gateway/GatewayFactory';
import {GetOrderByCode} from './application/queries/GetOrderByCode';
import {GetOrdersByCpf} from './application/queries/GetOrdersByCpf';
import type {RepositoryFactory} from './application/repositories/RepositoryFactory';
import {CancelOrder} from './application/usecases/CancelOrder';
import {ProcessOrder} from './application/usecases/ProcessOrder';
import {CreateOrderProjection} from './application/usecases/CreateOrderProjection';
import {Preview} from './application/usecases/Preview';
import {RequestCheckout} from './application/usecases/RequestCheckout';
import {SimulateShipping} from './application/usecases/SimulateShipping';
import {ValidateCoupon} from './application/usecases/ValidateCoupon';
import {CancelOrderController} from './infra/controller/CancelOrderController';
import {CheckoutController} from './infra/controller/ProcessOrderController';
import {CreateOrderProjectionController} from './infra/controller/CreateOrderProjectionController';
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
	readonly repositoryFactory = new RepositoryFactoryPrisma();

	constructor(
		readonly gatewayFactory: GatewayFactory,
	) {
	}

	async init() {
		const processOrder = new ProcessOrder(this.repositoryFactory, this.gatewayFactory);
		const validateCoupon = new ValidateCoupon(this.repositoryFactory);
		const simulateShipping = new SimulateShipping(this.gatewayFactory);
		const getOrderByCode = new GetOrderByCode();
		const getOrdersByCpf = new GetOrdersByCpf();
		const cancelOrder = new CancelOrder(this.repositoryFactory, this.gatewayFactory);
		const preview = new Preview(this.repositoryFactory, this.gatewayFactory);
		const requestCheckout = new RequestCheckout(this.repositoryFactory, this.gatewayFactory);
		const createOrderProjection = new CreateOrderProjection(this.repositoryFactory, this.gatewayFactory);

		const processOrderController = new CheckoutController(processOrder);
		const validateCouponController = new ValidateCouponController(validateCoupon);
		const simulateShippingController = new SimulateShippingController(simulateShipping);
		const getOrderByCodeController = new GetOrderByCodeController(getOrderByCode);
		const getOrdersByCpfController = new GetOrdersByCpfController(getOrdersByCpf);
		const cancelOrderController = new CancelOrderController(cancelOrder);
		const previewController = new PreviewController(preview);
		const requestCheckoutController = new RequestCheckoutController(requestCheckout);
		const createOrderProjectionController = new CreateOrderProjectionController(createOrderProjection);

		validateCouponController.register('post', '/validate/coupon', this.httpServer);
		simulateShippingController.register('post', '/simulate/shipping', this.httpServer);
		getOrderByCodeController.register('get', '/order/:code', this.httpServer);
		getOrdersByCpfController.register('get', '/orders', this.httpServer);
		cancelOrderController.register('post', '/order/:code/cancel', this.httpServer);
		previewController.register('post', '/preview', this.httpServer);
		requestCheckoutController.register('post', '/checkout', this.httpServer);
		this.httpServer.useErrorMiddleware(ErrorMiddleware.handle);

		await processOrderController.register('orderRequested', 'orderRequested.processOrder', this.gatewayFactory.queueGateway);
		await createOrderProjectionController.register('orderProcessed', 'orderProcessed.createProjection', this.gatewayFactory.queueGateway);
	}
}
