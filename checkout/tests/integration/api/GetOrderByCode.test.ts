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

test('GET /order/:code com pedido existente', async () => {
	const app = makeSut();

	const response = await request(app.httpServer.app).get('/order/202200000001');

	expect(response.status).toBe(200);
	expect(response.body.code).toBe('202200000001');
	expect(response.body.total).toBe(7070.38);
});

test('GET /order/:code com pedido inexistente', async () => {
	const app = makeSut();

	const response = await request(app.httpServer.app).get('/order/200000010000');

	expect(response.status).toBe(404);
});
