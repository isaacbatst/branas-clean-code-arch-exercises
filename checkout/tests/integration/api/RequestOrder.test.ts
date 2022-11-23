import request from 'supertest';
import {App} from '../../../src/app';
import {OrderRequested} from '../../../src/domain/events/OrderRequested';
import {GatewayFactoryFake} from '../../../src/infra/gateway/GatewayFactoryFake';

const makeSut = async () => {
	const gatewayFactory = new GatewayFactoryFake();
	const app = new App(gatewayFactory);
	await app.init();
	return {
		app,
		gatewayFactory,
	};
};

test('POST /checkout com um item', async () => {
	const {app} = await makeSut();
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
});

test('POST /checkout com dois itens', async () => {
	const {app} = await makeSut();

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
});

test('POST /checkout com cupom de desconto', async () => {
	const {app} = await makeSut();

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
});

test('POST /checkout com cupom inexistente', async () => {
	const {app} = await makeSut();

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

	expect(response.status).toBe(200);
});

test('POST /checkout dispara evento "orderRequested"', async () => {
	const {app, gatewayFactory} = await makeSut();
	const spy = jest.fn();
	await gatewayFactory.queueGateway.on('orderRequested', 'orderRequested.test', spy);

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

	expect(response.status).toBe(200);
	const year = new Date().getFullYear();
	expect(spy).toHaveBeenCalledWith({
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
		orderCode: `${year}00000006`,
	});
});
