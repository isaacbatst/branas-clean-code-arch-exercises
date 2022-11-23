import request from 'supertest';
import {App} from '../../../src/app';
import {GatewayFactoryFake} from '../../../src/infra/gateway/GatewayFactoryFake';

const makeSut = async () => {
	const gatewayFactory = new GatewayFactoryFake();
	const app = new App(gatewayFactory);
	await app.init();
	return app;
};

test('POST /order/cancel', async () => {
	const app = await makeSut();

	const firstResponse = await request(app.httpServer.app)
		.post('/order/202200000001/cancel');

	expect(firstResponse.status).toBe(200);

	const secondResponse = await request(app.httpServer.app)
		.post('/order/202200000001/cancel');

	expect(secondResponse.status).toBe(409);
});
