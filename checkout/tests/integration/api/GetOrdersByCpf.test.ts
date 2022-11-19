import request from 'supertest';
import {App} from '../../../src/app';
import {ItemGatewayFake} from '../../../src/infra/gateway/ItemGatewayFake';
import {ShippingGatewayFake} from '../../../src/infra/gateway/ShippingGatewayFake';

test('GET /orders', async () => {
	const shippingGateway = new ShippingGatewayFake();
	const itemGateway = new ItemGatewayFake();
	const app = new App(shippingGateway, itemGateway);
	const response = await request(app.httpServer.app).get('/orders')
		.send({
			cpf: '317.153.361-86',
		});

	expect(response.status).toBe(200);
});
