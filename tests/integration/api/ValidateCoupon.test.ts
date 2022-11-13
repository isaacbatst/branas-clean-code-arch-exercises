import request from 'supertest';
import httpServer from '../../../src/app';

test('POST /validate/coupon com cupom válido', async () => {
	const response = await request(httpServer.app)
		.post('/validate/coupon')
		.send({coupon: 'VALE20'});

	expect(response.status).toBe(200);
});

// Test('POST /validate/coupon com cupom expirado', async () => {
// });

// test('POST /validate/coupon com cupom não existente', async () => {
// });
