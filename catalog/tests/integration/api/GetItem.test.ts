import request from 'supertest';
import {App} from '../../../src/app';

test('GET /item/1 com id existente', async () => {
	const app = new App();
	const response = await request(app.httpServer.app)
		.get('/item/1');

	expect(response.status).toBe(200);
	expect(response.body.price).toBe(1000);
});

test('GET /item/99 com id inexistente', async () => {
	const app = new App();
	const response = await request(app.httpServer.app)
		.get('/item/99');

	expect(response.status).toBe(404);
});

