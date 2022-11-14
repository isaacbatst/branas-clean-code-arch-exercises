import Item from '../../../src/domain/entities/Item';
import {ItemRepositoryMemory} from '../../../src/infra/persistence/memory/ItemRepositoryMemory';
import {SimulateShipping} from '../../../src/application/usecases/SimulateShipping';
import {DistanceGatewayFake} from '../../../src/infra/gateway/DistanceGatewayFake';

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
	const distanceGateway = new DistanceGatewayFake();
	const itemRepository = new ItemRepositoryMemory();
	await itemRepository.addItem(new Item(guitar));
	await itemRepository.addItem(new Item(amp));
	const simulateShipping = new SimulateShipping(itemRepository, distanceGateway);
	const shippingPrice = await simulateShipping.execute({
		orderItems: [
			{id: 1, quantity: 1},
			{id: 2, quantity: 1},
		],
		destination: 'any-destination',
	});

	expect(shippingPrice).toBe(40);
});

test('Ao simular frete com produto não existente deve lançar erro', async () => {
	const distanceGateway = new DistanceGatewayFake();
	const itemRepository = new ItemRepositoryMemory();
	await itemRepository.addItem(new Item(guitar));
	const simulateShipping = new SimulateShipping(itemRepository, distanceGateway);

	await expect(async () => {
		await simulateShipping.execute({
			destination: 'any-destination',
			orderItems: [
				{id: 1, quantity: 1},
				{id: 2, quantity: 1},
			],
		});
	}).rejects.toThrow('Item não encontrado.');
});
