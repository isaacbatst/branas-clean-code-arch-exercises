import {App} from './app';
import {AddressGatewayViaCep} from './infra/gateway/AddressGatewayViaCep';

const addressGateway = new AddressGatewayViaCep();
const app = new App(addressGateway);

app.httpServer.listen(3000);

