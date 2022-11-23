import request from 'supertest';
import {App} from '../../../src/app';
import {GatewayFactoryFake} from '../../../src/infra/gateway/GatewayFactoryFake';

const makeSut = async () => {
	const gatewayFactory = new GatewayFactoryFake();
	const app = new App(gatewayFactory);
	await app.init();
	return app;
};

test('GET /orders', async () => {
	const app = await makeSut();

	const response = await request(app.httpServer.app).get('/orders')
		.send({
			cpf: '317.153.361-86',
		});

	expect(response.status).toBe(200);
});
