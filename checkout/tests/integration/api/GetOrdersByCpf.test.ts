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

test('GET /orders', async () => {
	const app = makeSut();

	const response = await request(app.httpServer.app).get('/orders')
		.send({
			cpf: '317.153.361-86',
		});

	expect(response.status).toBe(200);
});
