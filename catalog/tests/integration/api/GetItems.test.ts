import request from 'supertest';
import {App} from '../../../src/app';

test('GET /items', async () => {
	const app = new App();
	const response = await request(app.httpServer.app)
		.get('/items?ids=1,2');

	expect(response.status).toBe(200);
	expect(response.body.items).toContainEqual({
		description: 'Guitarra',
		depth: 10,
		height: 100,
		width: 30,
		price: 1000,
		weight: 3,
		addressCep: '29296-982',
		id: 1,
	});
	expect(response.body.items).toContainEqual({
		description: 'Amplificador',
		depth: 8,
		height: 15,
		width: 14,
		price: 5000,
		weight: 1,
		addressCep: '59700-970',
		id: 2,
	});
});
