import 'dotenv/config';
import {App} from './app';
import {ShippingGatewayImpl} from './infra/gateway/ShippingGatewayImpl';

const shippingGateway = new ShippingGatewayImpl();
const app = new App(shippingGateway);

app.httpServer.listen(3000);

