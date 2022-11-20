import request from 'supertest';
import {App} from '../../../src/app';
import {GatewayFactoryFake} from '../../../src/infra/gateway/GatewayFactoryFake';

const makeSut = () => {
	const gatewayFactory = new GatewayFactoryFake();
	const app = new App(gatewayFactory);
	return app;
};

test('POST /order/cancel', async () => {
	const app = makeSut();

	const firstResponse = await request(app.httpServer.app)
		.post('/order/cancel/202200000001');

	expect(firstResponse.status).toBe(200);

	const secondResponse = await request(app.httpServer.app)
		.post('/order/cancel/202200000001');

	expect(secondResponse.status).toBe(409);
});
