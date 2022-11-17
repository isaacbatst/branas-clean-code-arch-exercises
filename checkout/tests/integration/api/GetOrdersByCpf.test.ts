import request from 'supertest';
import {App} from '../../../src/app';
import {ShippingGatewayFake} from '../../../src/infra/gateway/ShippingGatewayFake';

test('GET /orders', async () => {
	const shippingGatewayFake = new ShippingGatewayFake();
	const app = new App(shippingGatewayFake);
	const response = await request(app.httpServer.app).get('/orders')
		.send({
			cpf: '317.153.361-86',
		});

	expect(response.status).toBe(200);
});
