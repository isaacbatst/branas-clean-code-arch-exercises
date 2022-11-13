import request from 'supertest';
import httpServer from '../../../src/app';

test('POST /validate/coupon com cupom válido', async () => {
	const response = await request(httpServer.app)
		.post('/validate/coupon')
		.send({coupon: 'VALE20'});

	expect(response.status).toBe(200);
	expect(response.body.valid).toBe(true);
});

test('POST /validate/coupon com cupom expirado', async () => {
	const response = await request(httpServer.app)
		.post('/validate/coupon')
		.send({coupon: 'VALE40'});

	expect(response.status).toBe(200);
	expect(response.body.valid).toBe(false);
});

test('POST /validate/coupon com cupom não existente', async () => {
	const response = await request(httpServer.app)
		.post('/validate/coupon')
		.send({coupon: 'VALE30'});

	expect(response.status).toBe(404);
});
