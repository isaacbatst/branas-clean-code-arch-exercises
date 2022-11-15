import {Checkout} from '../../../src/application/usecases/Checkout';
import Coupon from '../../../src/domain/entities/Coupon';
import Item from '../../../src/domain/entities/Item';
import {DistanceGatewayFake} from '../../../src/infra/gateway/DistanceGatewayFake';
import {CouponRepositoryMemory} from '../../../src/infra/persistence/memory/CouponRepositoryMemory';
import {ItemRepositoryMemory} from '../../../src/infra/persistence/memory/ItemRepositoryMemory';
import {OrderRepositoryMemory} from '../../../src/infra/persistence/memory/OrderRepositoryMemory';

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

const makeSut = async () => {
	const distanceGateway = new DistanceGatewayFake();
	const orderRepository = new OrderRepositoryMemory();
	const couponRepository = new CouponRepositoryMemory();
	const itemRepository = new ItemRepositoryMemory();
	await itemRepository.addItem(new Item(guitar));
	await itemRepository.addItem(new Item(amp));
	const checkout = new Checkout(orderRepository, couponRepository, itemRepository, distanceGateway);

	return {
		orderRepository,
		couponRepository,
		checkout,
	};
};

test('Ao criar pedido deve usar data atual e contagem do banco', async () => {
	const {checkout} = await makeSut();

	const created = await checkout.execute({cpf: '317.153.361-86', items: [], destination: 'any-destination'});

	const now = new Date();
	const year = now.getFullYear();
	expect(created.code).toBe(`${year}00000001`);
});

test('Ao criar o pedido com um item deve calcular o total', async () => {
	const {checkout} = await makeSut();

	const created = await checkout.execute({
		cpf: '317.153.361-86',
		items: [
			{id: 1, quantity: 1},
		],
		destination: 'any-destination',
	});

	expect(created.total).toBe(1030);
});

test('Ao criar o pedido com dois itens deve calcular o total', async () => {
	const {checkout} = await makeSut();

	const created = await checkout.execute({
		cpf: '317.153.361-86',
		items: [
			{id: 1, quantity: 2},
			{id: 2, quantity: 1},
		],
		destination: 'any-destination',
	});

	expect(created.total).toBe(7070);
});

test('Ao criar o pedido com cupom de desconto deve calcular o total', async () => {
	const {checkout, couponRepository} = await makeSut();
	const tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	await couponRepository.save(new Coupon('VALE20', 20, tomorrow));

	const created = await checkout.execute({
		cpf: '317.153.361-86',
		items: [
			{id: 1, quantity: 1},
			{id: 2, quantity: 1},
		],
		coupon: 'VALE20',
		destination: 'any-destination',
	});

	expect(created.total).toBe(4832);
});

test('Ao criar pedido com cupom inexistente deve lançar erro', async () => {
	const {checkout} = await makeSut();

	await expect(async () => {
		await checkout.execute({
			cpf: '317.153.361-86',
			items: [
				{id: 1, quantity: 1},
				{id: 2, quantity: 1},
			],
			coupon: 'VALE20',
			destination: 'any-destination',
		});
	}).rejects.toThrow('COUPON_NOT_FOUND');
});
