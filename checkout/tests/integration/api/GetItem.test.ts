import request from 'supertest';
import {App} from '../../../src/app';
import {ShippingGatewayFake} from '../../../src/infra/gateway/ShippingGatewayFake';

test('GET /item/1 com id existente', async () => {
	const shippingGatewayFake = new ShippingGatewayFake();
	const app = new App(shippingGatewayFake);
	const response = await request(app.httpServer.app)
		.get('/item/1');

	expect(response.status).toBe(200);
	expect(response.body.price).toBe(1000);
});

test('GET /item/99 com id inexistente', async () => {
	const shippingGatewayFake = new ShippingGatewayFake();
	const app = new App(shippingGatewayFake);
	const response = await request(app.httpServer.app)
		.get('/item/99');

	expect(response.status).toBe(404);
});

