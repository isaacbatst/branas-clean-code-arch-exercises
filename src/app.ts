import {Checkout} from './application/Checkout';
import {CheckoutController} from './infra/controller/CheckoutController';
import {HttpServerExpressAdapter} from './infra/http/HttpServerExpressAdapter';
import {ErrorMiddleware} from './infra/middleware/ErrorMiddleware';
import {CouponRepositoryPrisma} from './infra/persistence/prisma/CouponRepositoryPrisma';
import {ItemRepositoryPrisma} from './infra/persistence/prisma/ItemRepositoryPrisma';
import {OrderRepositoryPrisma} from './infra/persistence/prisma/OrderRepositoryPrisma';
import {ValidateCouponController} from './infra/controller/ValidateCouponController';
import {ValidateCoupon} from './application/ValidateCoupon';
import {SimulateShippingController} from './infra/controller/SimulateShippingController';
import {SimulateShipping} from './application/SimulateShipping';

const couponRepository = new CouponRepositoryPrisma();
const orderRepository = new OrderRepositoryPrisma();
const itemRepository = new ItemRepositoryPrisma();
const checkout = new Checkout(orderRepository, couponRepository, itemRepository);
const validateCoupon = new ValidateCoupon(couponRepository);
const simulateShipping = new SimulateShipping(itemRepository);

const httpServer = new HttpServerExpressAdapter();

const orderController = new CheckoutController(httpServer, checkout);
orderController.register();
const validateCouponController = new ValidateCouponController(httpServer, validateCoupon);
validateCouponController.register();
const simulateShippingController = new SimulateShippingController(httpServer, simulateShipping);
simulateShippingController.register();

httpServer.useErrorMiddleware(ErrorMiddleware.handle);

export default httpServer;
