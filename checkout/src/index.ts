import 'dotenv/config';
import {App} from './app';
import {GatewayFactoryImpl} from './infra/gateway/GatewayFactoryImpl';

async function main() {
	if (!process.env.API_PORT) {
		throw new Error('API port missing');
	}

	const gatewayFactory = new GatewayFactoryImpl();
	const app = new App(gatewayFactory);

	await app.init();

	app.httpServer.listen(Number(process.env.API_PORT));
}

main()
	.catch(err => {
		console.error('Main error: ', err);
	});

