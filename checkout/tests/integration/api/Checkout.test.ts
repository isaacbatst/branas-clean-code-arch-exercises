import request from 'supertest';
import {App} from '../../../src/app';
import {ItemGatewayFake} from '../../../src/infra/gateway/ItemGatewayFake';
import {ShippingGatewayFake} from '../../../src/infra/gateway/ShippingGatewayFake';

test('POST /checkout com um item', async () => {
	const shippingGateway = new ShippingGatewayFake();
	const itemGateway = new ItemGatewayFake();
	const app = new App(shippingGateway, itemGateway);
	const response = await request(app.httpServer.app)
		.post('/checkout')
		.send({
			cpf: '317.153.361-86',
			items: [
				{
					id: 1,
					quantity: 1,
				},
			],
			destination: '71692-404',
		});

	expect(response.status).toBe(200);
	expect(response.body.total).toBe(1010);
});

test('POST /checkout com dois itens', async () => {
	const shippingGateway = new ShippingGatewayFake();
	const itemGateway = new ItemGatewayFake();
	const app = new App(shippingGateway, itemGateway);
	const response = await request(app.httpServer.app).post('/checkout')
		.send({
			cpf: '317.153.361-86',
			items: [
				{
					id: 1,
					quantity: 2,
				},
				{
					id: 2,
					quantity: 1,
				},
			],
			destination: '71692-404',
		});

	expect(response.status).toBe(200);
	expect(response.body.total).toBe(7030);
});

test('POST /checkout com cupom de desconto', async () => {
	const shippingGateway = new ShippingGatewayFake();
	const itemGateway = new ItemGatewayFake();
	const app = new App(shippingGateway, itemGateway);

	const response = await request(app.httpServer.app).post('/checkout')
		.send({
			cpf: '317.153.361-86',
			items: [
				{
					id: 1,
					quantity: 1,
				},
				{
					id: 2,
					quantity: 1,
				},
			],
			coupon: 'VALE20',
			destination: '71692-404',
		});

	expect(response.status).toBe(200);
	expect(response.body.total).toBe(4816);
});

test('POST /checkout com cupom inexistente', async () => {
	const shippingGateway = new ShippingGatewayFake();
	const itemGateway = new ItemGatewayFake();
	const app = new App(shippingGateway, itemGateway);

	const response = await request(app.httpServer.app).post('/checkout')
		.send({
			cpf: '317.153.361-86',
			items: [
				{
					id: 1,
					quantity: 1,
				},
				{
					id: 2,
					quantity: 1,
				},
			],
			coupon: 'VALE30',
			destination: '71692-404',
		});

	expect(response.status).toBe(404);
	expect(response.body.message).toBe('Cupom não encontrado');
});
