import request from 'supertest';
import httpServer from '../../../src/app';

test('Ao simular o frete deve retornar valor', async () => {
	const response = await request(httpServer.app)
		.post('/simulate/shipping')
		.send([
			{id: 1, quantity: 1},
			{id: 2, quantity: 1},
		]);

	expect(response.status).toBe(200);
	expect(response.body.shipping).toBe(40);
});

test('Ao simular frete com produto não existente deve lançar erro', async () => {
	const response = await request(httpServer.app)
		.post('/simulate/shipping')
		.send([
			{id: 1, quantity: 1},
			{id: 3, quantity: 1},
		]);

	expect(response.status).toBe(404);
});
