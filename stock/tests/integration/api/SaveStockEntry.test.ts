import request from 'supertest';
import {App} from '../../../src/app';

test('POST /stock-entry cria um registro', async () => {
	const app = new App();
	const response = await request(app.httpServer.app)
		.post('/stock-entry')
		.send({
			quantity: 10,
			operation: 'increment',
			idItem: 1,
		});

	expect(response.status).toBe(201);
	expect(response.body.id).toBe(1);
});

test('POST /stock-entry cria o próximo registro', async () => {
	const app = new App();
	const response = await request(app.httpServer.app)
		.post('/stock-entry')
		.send({
			quantity: 10,
			operation: 'increment',
			idItem: 1,
		});

	expect(response.status).toBe(201);
	expect(response.body.id).toBe(2);
});

