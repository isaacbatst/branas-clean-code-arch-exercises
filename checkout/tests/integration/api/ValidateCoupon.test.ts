import request from 'supertest';
import {App} from '../../../src/app';
import {ItemGatewayFake} from '../../../src/infra/gateway/ItemGatewayFake';
import {ShippingGatewayFake} from '../../../src/infra/gateway/ShippingGatewayFake';
import {StockGatewayFake} from '../../../src/infra/gateway/StockGatewayFake';

const makeSut = () => {
	const shippingGateway = new ShippingGatewayFake();
	const itemGateway = new ItemGatewayFake();
	const stockGateway = new StockGatewayFake();
	const app = new App(shippingGateway, itemGateway, stockGateway);

	return app;
};

test('POST /validate/coupon com cupom válido', async () => {
	const app = makeSut();

	const response = await request(app.httpServer.app).post('/validate/coupon')
		.send({coupon: 'VALE20'});

	expect(response.status).toBe(200);
	expect(response.body.valid).toBe(true);
});

test('POST /validate/coupon com cupom expirado', async () => {
	const app = makeSut();

	const response = await request(app.httpServer.app).post('/validate/coupon')
		.send({coupon: 'VALE40'});

	expect(response.status).toBe(200);
	expect(response.body.valid).toBe(false);
});

test('POST /validate/coupon com cupom não existente', async () => {
	const app = makeSut();

	const response = await request(app.httpServer.app).post('/validate/coupon')
		.send({coupon: 'VALE30'});

	expect(response.status).toBe(404);
});
