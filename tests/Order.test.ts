import Coupon from '../src/entities/Coupon';
import Item from '../src/entities/Item';
import Order from '../src/entities/Order';

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

const cable = {
	id: 3,
	description: 'cabo',
	depth: 5,
	height: 100,
	width: 40,
	price: 30,
	weight: 5,
};

test('Não deve criar um pedido com CPF inválido', () => {
	expect(() => new Order('111.111.111-11', new Date(), 0)).toThrow(new Error('Cpf inválido'));
});

test('Deve criar um pedido sem itens', () => {
	const order = new Order('317.153.361-86', new Date(), 0);
	const total = order.getTotal();
	expect(total).toBe(0);
});

test('Deve criar um pedido com 3 itens', () => {
	const order = new Order('317.153.361-86', new Date(), 0);
	order.addItem(new Item(guitar), 1);
	order.addItem(new Item(amp), 1);
	order.addItem(new Item(cable), 3);
	const total = order.getTotal();
	expect(total).toBe(6180);
});

test('Deve criar um pedido com 3 itens com cupom de desconto', () => {
	const order = new Order('317.153.361-86', new Date(), 0);
	order.addItem(new Item(guitar), 1);
	order.addItem(new Item(amp), 1);
	order.addItem(new Item(cable), 3);

	const tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	order.addCoupon(new Coupon('VALE20', 20, tomorrow));

	expect(order.getTotal()).toBe(4944);
});

test('Não deve aplicar um cupom de desconto expirado', () => {
	const order = new Order('317.153.361-86', new Date(), 0);
	const yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 1);

	expect(() => {
		order.addCoupon(new Coupon('VALE20', 20, yesterday));
	}).toThrowError('Cupom expirado');
});

test('Ao fazer um pedido, a quantidade de um item não pode ser negativa', () => {
	expect(() => {
		const order = new Order('317.153.361-86', new Date(), 0);
		order.addItem(new Item(guitar), -1);
	}).toThrow('Quantidade não pode ser negativa');
});

test('Ao fazer um pedido, o mesmo item não pode ser informado mais de uma vez', () => {
	expect(() => {
		const order = new Order('317.153.361-86', new Date(), 0);
		order.addItem(new Item(guitar), 1);
		order.addItem(new Item(guitar), 1);
	}).toThrowError('Item duplicado');
});

test('Ao fazer um pedido, deve incluir código', () => {
	const order = new Order('317.153.361-86', new Date('2015-10-05'), 188);
	expect(order.code).toBe('201500000189');
});
