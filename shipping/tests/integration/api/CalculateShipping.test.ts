import request from 'supertest';
import {App} from '../../../src/app';
import {AddressGatewayFake} from '../../../src/infra/gateway/AddressGatewayFake';

test('Ao calcular o frete deve retornar valor', async () => {
	const addressGateway = new AddressGatewayFake();

	const app = new App(addressGateway);
	const response = await request(app.httpServer.app).post('/calculate/shipping')
		.send({
			destination: '59700-970',
			orderItems: [
				{
					id: 1,
					dimensions: {
						depth: 10,
						height: 100,
						width: 30,
					},
					weight: 3,
					origin: '71692-404',
					quantity: 2,
				},
				{
					id: 2,
					dimensions: {
						depth: 8,
						height: 15,
						width: 14,
					},
					weight: 1,
					origin: '29296-982',
					quantity: 1,
				},
			],
		});

	expect(response.status).toBe(200);
	expect(response.body.shipping).toContainEqual({id: 1, shipping: 94.68});
	expect(response.body.shipping).toContainEqual({id: 2, shipping: 17.05});
});
