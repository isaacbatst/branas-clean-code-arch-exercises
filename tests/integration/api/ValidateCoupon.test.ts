import request from 'supertest';
import {App} from '../../../src/app';
import {AddressGatewayFake} from '../../../src/infra/gateway/AddressGatewayFake';

test('POST /validate/coupon com cupom válido', async () => {
	const addressGateway = new AddressGatewayFake();

	const app = new App(addressGateway);
	const response = await request(app.httpServer.app).post('/validate/coupon')
		.send({coupon: 'VALE20'});

	expect(response.status).toBe(200);
	expect(response.body.valid).toBe(true);
});

test('POST /validate/coupon com cupom expirado', async () => {
	const addressGateway = new AddressGatewayFake();

	const app = new App(addressGateway);
	const response = await request(app.httpServer.app).post('/validate/coupon')
		.send({coupon: 'VALE40'});

	expect(response.status).toBe(200);
	expect(response.body.valid).toBe(false);
});

test('POST /validate/coupon com cupom não existente', async () => {
	const addressGateway = new AddressGatewayFake();

	const app = new App(addressGateway);
	const response = await request(app.httpServer.app).post('/validate/coupon')
		.send({coupon: 'VALE30'});

	expect(response.status).toBe(404);
});
