import {Checkout} from './application/Checkout';
import {OrderController} from './infra/controller/OrderController';
import {HttpServerExpressAdapter} from './infra/http/HttpServerExpressAdapter';
import {CouponRepositoryPrisma} from './infra/persistence/prisma/CouponRepositoryPrisma';
import {ItemRepositoryPrisma} from './infra/persistence/prisma/ItemRepositoryPrisma';
import {OrderRepositoryPrisma} from './infra/persistence/prisma/OrderRepositoryPrisma';

const couponRepository = new CouponRepositoryPrisma();
const orderRepository = new OrderRepositoryPrisma();
const itemRepository = new ItemRepositoryPrisma();
const checkout = new Checkout(orderRepository, couponRepository, itemRepository);
const httpServer = new HttpServerExpressAdapter();
const orderController = new OrderController(httpServer, checkout);
orderController.setupRoutes();

httpServer.listen(3000);

