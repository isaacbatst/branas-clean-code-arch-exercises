import request from 'supertest';
import {App} from '../../../src/app';
import {AddressGatewayFake} from '../../../src/infra/gateway/AddressGatewayFake';

test('Ao simular o frete deve retornar valor', async () => {
	const addressGateway = new AddressGatewayFake();

	const app = new App(addressGateway);
	const response = await request(app.httpServer.app).post('/simulate/shipping')
		.send({
			orderItems: [
				{id: 1, quantity: 1},
				{id: 2, quantity: 1},
			],
			destination: '71692-404',
		});

	expect(response.status).toBe(200);
	expect(response.body.shipping).toBe(43.08);
});

test('Ao simular frete com produto não existente deve lançar erro', async () => {
	const addressGateway = new AddressGatewayFake();

	const app = new App(addressGateway);
	const response = await request(app.httpServer.app).post('/simulate/shipping')
		.send({
			orderItems: [
				{id: 1, quantity: 1},
				{id: 3, quantity: 1},
			],
			destination: '71692-404',
		});

	expect(response.status).toBe(404);
});
