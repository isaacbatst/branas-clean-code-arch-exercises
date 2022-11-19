import {App} from '../../../src/app';
import request from 'supertest';
import {ShippingGatewayFake} from '../../../src/infra/gateway/ShippingGatewayFake';
import {ItemGatewayFake} from '../../../src/infra/gateway/ItemGatewayFake';

test('GET /order/:code com pedido existente', async () => {
	const shippingGateway = new ShippingGatewayFake();
	const itemGateway = new ItemGatewayFake();
	const app = new App(shippingGateway, itemGateway);
	const response = await request(app.httpServer.app).get('/order/202200000001');

	expect(response.status).toBe(200);
	expect(response.body.code).toBe('202200000001');
	expect(response.body.total).toBe(7070.38);
});

test('GET /order/:code com pedido inexistente', async () => {
	const shippingGateway = new ShippingGatewayFake();
	const itemGateway = new ItemGatewayFake();
	const app = new App(shippingGateway, itemGateway);

	const response = await request(app.httpServer.app).get('/order/200000010000');

	expect(response.status).toBe(404);
});
