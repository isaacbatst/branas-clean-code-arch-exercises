import {App} from '../../../src/app';
import {AddressGatewayFake} from '../../../src/infra/gateway/AddressGatewayFake';
import request from 'supertest';

test('GET /orders', async () => {
	const addressGateway = new AddressGatewayFake();

	const app = new App(addressGateway);
	const response = await request(app.httpServer.app).get('/orders')
		.send({
			cpf: '317.153.361-86',
		});

	expect(response.status).toBe(200);
});
