import {CalculateShipping} from '../../../src/application/usecases/CalculateShipping';
import {AddressGatewayFake} from '../../../src/infra/gateway/AddressGatewayFake';
import {CityRepositoryMemory} from '../../../src/infra/persistence/memory/CityRepositoryMemory';

const guitar = {
	dimensions: {
		depth: 10,
		height: 100,
		width: 30,
	},
	weight: 3,
	addressCep: '71692-404',
};

const amp = {
	dimensions: {
		depth: 8,
		height: 15,
		width: 14,
	},
	weight: 1,
	addressCep: '29296-982',
};

test('Deve calcular frete com 1 item', async () => {
	const addressGateway = new AddressGatewayFake();
	const cityRepository = new CityRepositoryMemory();

	const calculateShipping = new CalculateShipping(addressGateway, cityRepository);
	const shippingPrice = await calculateShipping.execute({
		destination: '59700-970',
		orderItems: [
			{dimensions: guitar.dimensions, weight: guitar.weight, origin: guitar.addressCep, quantity: 1},
		],
	});

	expect(shippingPrice).toBe(47.34);
});

test('Deve calcular frete com 2 do mesmo item', async () => {
	const addressGateway = new AddressGatewayFake();
	const cityRepository = new CityRepositoryMemory();

	const calculateShipping = new CalculateShipping(addressGateway, cityRepository);
	const shippingPrice = await calculateShipping.execute({
		destination: '59700-970',
		orderItems: [
			{dimensions: guitar.dimensions, weight: guitar.weight, origin: guitar.addressCep, quantity: 2},
		],
	});

	expect(shippingPrice).toBe(94.68);
});

test('Deve calcular frete com 2 itens', async () => {
	const addressGateway = new AddressGatewayFake();
	const cityRepository = new CityRepositoryMemory();

	const calculateShipping = new CalculateShipping(addressGateway, cityRepository);
	const shippingPrice = await calculateShipping.execute({
		destination: '59700-970',
		orderItems: [
			{dimensions: guitar.dimensions, weight: guitar.weight, origin: guitar.addressCep, quantity: 2},
			{dimensions: amp.dimensions, weight: amp.weight, origin: amp.addressCep, quantity: 1},
		],
	});

	expect(shippingPrice).toBe(111.73);
});
