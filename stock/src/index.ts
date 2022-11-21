import {App} from './app';
import {QueueGatewayAmqp} from './infra/gateway/QueueGatewayAmqp';

async function main() {
	if (!process.env.API_PORT) {
		throw new Error('API port missing');
	}

	const queueGateway = new QueueGatewayAmqp();
	const app = new App(queueGateway);

	app.httpServer.listen(Number(process.env.API_PORT));
}

main()
	.catch(err => {
		console.error('Main error: ', err);
	});

