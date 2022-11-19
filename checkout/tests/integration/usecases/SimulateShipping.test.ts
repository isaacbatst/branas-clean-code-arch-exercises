import {SimulateShipping} from '../../../src/application/usecases/SimulateShipping';
import {ItemGatewayFake} from '../../../src/infra/gateway/ItemGatewayFake';
import {ShippingGatewayFake} from '../../../src/infra/gateway/ShippingGatewayFake';

const guitar = {
	id: 1,
	description: 'Guitarra',
	depth: 10,
	height: 100,
	width: 30,
	price: 1000,
	weight: 3,
	addressCep: 'any-address',
};

const amp = {
	id: 2,
	description: 'amp',
	depth: 8,
	height: 15,
	width: 14,
	price: 5000,
	weight: 1,
	addressCep: 'any-address',
};

test('Ao simular o frete deve retornar valor', async () => {
	const shippingGateway = new ShippingGatewayFake();
	const itemGateway = new ItemGatewayFake();
	const simulateShipping = new SimulateShipping(itemGateway, shippingGateway);
	const shippingPrice = await simulateShipping.execute({
		orderItems: [
			{id: 1, quantity: 1},
			{id: 2, quantity: 1},
		],
		destination: 'any-destination',
	});

	expect(shippingPrice).toBe(20);
});

test('Ao simular frete com produto não existente deve lançar erro', async () => {
	const shippingGateway = new ShippingGatewayFake();
	const itemGateway = new ItemGatewayFake();
	const simulateShipping = new SimulateShipping(itemGateway, shippingGateway);

	await expect(async () => {
		await simulateShipping.execute({
			destination: 'any-destination',
			orderItems: [
				{id: 1, quantity: 1},
				{id: 3, quantity: 1},
			],
		});
	}).rejects.toThrow('Item não encontrado');
});
