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

	return app.httpServer.app;
};

test('POST /order/cancel', async () => {
	const app = makeSut();

	const firstResponse = await request(app)
		.post('/order/cancel/202200000001');

	expect(firstResponse.status).toBe(200);

	const secondResponse = await request(app)
		.post('/order/cancel/202200000001');

	expect(secondResponse.status).toBe(409);
});
