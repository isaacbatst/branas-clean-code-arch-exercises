import request from 'supertest';
import {App} from '../../../src/app';
import {GatewayFactoryFake} from '../../../src/infra/gateway/GatewayFactoryFake';

const makeSut = async () => {
	const gatewayFactory = new GatewayFactoryFake();
	const app = new App(gatewayFactory);
	await app.init();
	return app;
};

test('POST /preview com um item', async () => {
	const app = await makeSut();
	const response = await request(app.httpServer.app)
		.post('/preview')
		.send({
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

test('POST /preview com dois itens', async () => {
	const app = await makeSut();

	const response = await request(app.httpServer.app).post('/preview')
		.send({
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

test('POST /preview com cupom de desconto', async () => {
	const app = await makeSut();

	const response = await request(app.httpServer.app).post('/preview')
		.send({
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

test('POST /preview com cupom inexistente', async () => {
	const app = await makeSut();

	const response = await request(app.httpServer.app).post('/preview')
		.send({
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
