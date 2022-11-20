import request from 'supertest';
import {App} from '../../../src/app';
import {GatewayFactoryFake} from '../../../src/infra/gateway/GatewayFactoryFake';

const makeSut = () => {
	const gatewayFactory = new GatewayFactoryFake();
	const app = new App(gatewayFactory);
	return app;
};

test('GET /order/:code com pedido existente', async () => {
	const app = makeSut();

	const response = await request(app.httpServer.app).get('/order/202200000001');

	expect(response.status).toBe(200);
	expect(response.body.code).toBe('202200000001');
	expect(response.body.total).toBe(7070.38);
});

test('GET /order/:code com pedido inexistente', async () => {
	const app = makeSut();

	const response = await request(app.httpServer.app).get('/order/200000010000');

	expect(response.status).toBe(404);
});
