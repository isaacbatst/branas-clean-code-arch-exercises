import request from 'supertest';
import prisma from '../../../src/infra/persistence/prisma/prisma';
import httpServer from '../../../src/app';

afterAll(async () => {
	await prisma.order.deleteMany();
});

test('POST /checkout com um item', async () => {
	const response = await request(httpServer.app)
		.post('/checkout')
		.send({
			cpf: '317.153.361-86',
			items: [
				{
					id: 1,
					quantity: 1,
				},
			],
		});

	expect(response.status).toBe(200);
	expect(response.body.total).toBe(1030);
});

test('POST /checkout com dois itens', async () => {
	const response = await request(httpServer.app)
		.post('/checkout')
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
		});

	expect(response.status).toBe(200);
	expect(response.body.total).toBe(7070);
});

test('POST /checkout com cupom de desconto', async () => {
	const response = await request(httpServer.app)
		.post('/checkout')
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
		});

	expect(response.status).toBe(200);
	expect(response.body.total).toBe(4832);
});

test('POST /checkout com cupom inexistente', async () => {
	const response = await request(httpServer.app)
		.post('/checkout')
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
		});

	expect(response.status).toBe(404);
	expect(response.body.message).toBe('COUPON_NOT_FOUND');
});
