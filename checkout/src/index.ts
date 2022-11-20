import 'dotenv/config';
import {App} from './app';
import {GatewayFactoryImpl} from './infra/gateway/GatewayFactoryImpl';

async function main() {
	const gatewayFactory = new GatewayFactoryImpl();
	const app = new App(gatewayFactory);

	app.httpServer.listen(Number(process.env.API_PORT));
}

main()
	.catch(err => {
		console.error('Main error: ', err);
	});

