import Item from '../src/domain/entities/Item';
import {ItemRepositoryMemory} from '../src/infra/persistence/memory/ItemRepositoryMemory';
import {SimulateShipping} from '../src/domain/usecases/SimulateShipping';

const guitar = {
	id: 1,
	description: 'Guitarra',
	depth: 10,
	height: 100,
	width: 30,
	price: 1000,
	weight: 3,
};

const amp = {
	id: 2,
	description: 'amp',
	depth: 8,
	height: 15,
	width: 14,
	price: 5000,
	weight: 1,
};

test('Ao simular o frete deve retornar valor', async () => {
	const itemRepository = new ItemRepositoryMemory();
	await itemRepository.addItem(new Item(guitar));
	await itemRepository.addItem(new Item(amp));
	const simulateShipping = new SimulateShipping(itemRepository);
	const shippingPrice = await simulateShipping.execute([
		{id: 1, quantity: 1},
		{id: 2, quantity: 1},
	]);

	expect(shippingPrice).toBe(40);
});

test('Ao simular frete com produto não existente deve lançar erro', async () => {
	const itemRepository = new ItemRepositoryMemory();
	await itemRepository.addItem(new Item(guitar));
	const simulateShipping = new SimulateShipping(itemRepository);

	await expect(async () => {
		await simulateShipping.execute([
			{id: 1, quantity: 1},
			{id: 2, quantity: 1},
		]);
	}).rejects.toThrow('Item não encontrado.');
});
