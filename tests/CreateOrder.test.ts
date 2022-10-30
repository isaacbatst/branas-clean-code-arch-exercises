import Coupon from '../src/entities/Coupon';
import {CouponRepositoryMemory} from '../src/repositories/memory/CouponRepositoryMemory';
import {OrderRepositoryMemory} from '../src/repositories/memory/OrderRepositoryMemory';
import {CreateOrder} from '../src/usecases/CreateOrder';

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

const makeSut = () => {
	const orderRepository = new OrderRepositoryMemory();
	const couponRepository = new CouponRepositoryMemory();
	const createOrder = new CreateOrder(orderRepository, couponRepository);

	return {
		orderRepository,
		couponRepository,
		createOrder,
	};
};

test('Ao criar pedido deve usar data atual e contagem do banco', async () => {
	const {createOrder} = makeSut();

	const created = await createOrder.execute({cpf: '317.153.361-86', items: []});

	const now = new Date();
	const year = now.getFullYear();
	expect(created.code).toBe(`${year}00000001`);
});

test('Ao criar o pedido deve calcular o total', async () => {
	const {createOrder} = makeSut();

	const created = await createOrder.execute({
		cpf: '317.153.361-86',
		items: [
			{...amp, quantity: 1},
			{...guitar, quantity: 1},
		],
	});

	expect(created.total).toBe(6040);
});

test('Ao criar o pedido com cupom de desconto deve calcular o total', async () => {
	const {createOrder, couponRepository} = makeSut();
	const tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	await couponRepository.save(new Coupon('VALE20', 20, tomorrow));

	const created = await createOrder.execute({
		cpf: '317.153.361-86',
		items: [
			{...amp, quantity: 1},
			{...guitar, quantity: 1},
		],
		coupon: 'VALE20',
	});

	expect(created.total).toBe(4832);
});

test('Ao criar pedido com cupom inexistente deve lançar erro', async () => {
	const {createOrder} = makeSut();

	await expect(async () => {
		await createOrder.execute({
			cpf: '317.153.361-86',
			items: [
				{...amp, quantity: 1},
				{...guitar, quantity: 1},
			],
			coupon: 'VALE20',
		});
	}).rejects.toThrow('Cupom não encontrado');
});
