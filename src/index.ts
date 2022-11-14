import {App} from './app';
import {AddressGatewayImpl} from './infra/gateway/AddressGatewayImpl';

const addressGateway = new AddressGatewayImpl();
const app = new App(addressGateway);

app.httpServer.listen(3000);

