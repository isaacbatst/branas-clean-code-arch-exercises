import request from 'supertest';
import {App} from '../../../src/app';
import {GatewayFactoryFake} from '../../../src/infra/gateway/GatewayFactoryFake';

const makeSut = async () => {
	const gatewayFactory = new GatewayFactoryFake();
	const app = new App(gatewayFactory);
	await app.init();
	return app;
};

test('Ao simular o frete deve retornar valor', async () => {
	const app = await makeSut();

	const response = await request(app.httpServer.app).post('/simulate/shipping')
		.send({
			orderItems: [
				{id: 1, quantity: 1},
				{id: 2, quantity: 1},
			],
			destination: '71692-404',
		});

	expect(response.status).toBe(200);
	expect(response.body.shipping).toBe(20);
});

test('Ao simular frete com produto não existente deve lançar erro', async () => {
	const app = await makeSut();

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
