import {App} from './app';
import {AddressGatewayViaCep} from './infra/gateway/AddressGatewayViaCep';

if (!process.env.API_PORT) {
	throw new Error('API port missing');
}

const addressGateway = new AddressGatewayViaCep();
const app = new App(addressGateway);

app.httpServer.listen(Number(process.env.API_PORT));

