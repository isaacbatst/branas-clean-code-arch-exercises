import 'dotenv/config';
import {App} from './app';
import {ItemGatewayHttp} from './infra/gateway/ItemGatewayHttp';
import {ShippingGatewayHttp} from './infra/gateway/ShippingGatewayHttp';

const shippingGateway = new ShippingGatewayHttp();
const itemGateway = new ItemGatewayHttp();
const app = new App(shippingGateway, itemGateway);

app.httpServer.listen(Number(process.env.API_PORT));

