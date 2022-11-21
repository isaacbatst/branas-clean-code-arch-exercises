import request from 'supertest';
import {App} from '../../../src/app';

test('GET /items', async () => {
	const app = new App();
	const response = await request(app.httpServer.app)
		.get('/items?ids=1,2');

	expect(response.status).toBe(200);
	expect(response.body.items).toContainEqual({description: 'Guitarra', price: 1000});
	expect(response.body.items).toContainEqual({description: 'Amplificador', price: 5000});
});
