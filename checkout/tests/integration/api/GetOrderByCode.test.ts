import {App} from '../../../src/app';
import request from 'supertest';
import {ShippingGatewayFake} from '../../../src/infra/gateway/ShippingGatewayFake';

test('GET /order/:code com pedido existente', async () => {
	const shippingGatewayFake = new ShippingGatewayFake();
	const app = new App(shippingGatewayFake);
	const response = await request(app.httpServer.app).get('/order/202200000001');

	expect(response.status).toBe(200);
	expect(response.body.code).toBe('202200000001');
	expect(response.body.total).toBe(7070.38);
});

test('GET /order/:code com pedido inexistente', async () => {
	const shippingGatewayFake = new ShippingGatewayFake();
	const app = new App(shippingGatewayFake);

	const response = await request(app.httpServer.app).get('/order/200000010000');

	expect(response.status).toBe(404);
});
