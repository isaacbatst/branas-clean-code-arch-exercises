import 'dotenv/config';
import {App} from './app';
import {ItemGatewayHttp} from './infra/gateway/ItemGatewayHttp';
import {ShippingGatewayHttp} from './infra/gateway/ShippingGatewayHttp';
import {StockGatewayHttp} from './infra/gateway/StockGatewayHttp';

const shippingGateway = new ShippingGatewayHttp();
const itemGateway = new ItemGatewayHttp();
const stockGateway = new StockGatewayHttp();
const app = new App(shippingGateway, itemGateway, stockGateway);

app.httpServer.listen(Number(process.env.API_PORT));

