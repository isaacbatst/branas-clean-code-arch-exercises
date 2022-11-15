import request from 'supertest';
import {App} from '../../../src/app';
import {AddressGatewayFake} from '../../../src/infra/gateway/AddressGatewayFake';
import prisma from '../../../src/infra/persistence/prisma/prisma';

afterAll(async () => {
	await prisma.order.deleteMany();
});

test('POST /checkout com um item', async () => {
	const addressGateway = new AddressGatewayFake();

	const app = new App(addressGateway);
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
	expect(response.body.total).toBe(1027.3);
});

test('POST /checkout com dois itens', async () => {
	const addressGateway = new AddressGatewayFake();

	const app = new App(addressGateway);
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
	expect(response.body.total).toBe(7070.38);
});

test('POST /checkout com cupom de desconto', async () => {
	const addressGateway = new AddressGatewayFake();

	const app = new App(addressGateway);
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
	expect(response.body.total).toBe(4834.464);
});

test('POST /checkout com cupom inexistente', async () => {
	const addressGateway = new AddressGatewayFake();

	const app = new App(addressGateway);
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
	expect(response.body.message).toBe('COUPON_NOT_FOUND');
});
