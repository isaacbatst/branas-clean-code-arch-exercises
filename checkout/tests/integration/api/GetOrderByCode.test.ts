import {App} from '../../../src/app';
import {AddressGatewayFake} from '../../../src/infra/gateway/AddressGatewayFake';
import request from 'supertest';

test('GET /order/:code com pedido existente', async () => {
	const addressGateway = new AddressGatewayFake();

	const app = new App(addressGateway);
	const response = await request(app.httpServer.app).get('/order/202200000001');

	expect(response.status).toBe(200);
	expect(response.body.code).toBe('202200000001');
	expect(response.body.total).toBe(7070.38);
});

test('GET /order/:code com pedido inexistente', async () => {
	const addressGateway = new AddressGatewayFake();

	const app = new App(addressGateway);
	const response = await request(app.httpServer.app).get('/order/200000010000');

	expect(response.status).toBe(404);
});
