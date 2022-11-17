import Coupon from '../../src/domain/entities/Coupon';
import Item from '../../src/domain/entities/Item';
import Order from '../../src/domain/entities/Order';

const guitar = {
	id: 1,
	description: 'Guitarra',
	depth: 10,
	height: 100,
	width: 30,
	price: 1000,
	weight: 3,
	addressCep: 'any-address',
	shipping: 30,
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
	shipping: 100,
};

const cable = {
	id: 3,
	description: 'cabo',
	depth: 5,
	height: 100,
	width: 40,
	price: 30,
	weight: 5,
	addressCep: 'any-address',
	shipping: 10,
};

test('Não deve criar um pedido com CPF inválido', () => {
	expect(() => new Order('111.111.111-11', new Date(), 0, 'any-destination')).toThrow('INVALID_CPF');
});

test('Deve criar um pedido sem itens', () => {
	const order = new Order('317.153.361-86', new Date(), 0, 'any-destination');
	const total = order.getTotal();
	expect(total).toBe(0);
});

test('Deve criar um pedido com 3 itens', () => {
	const order = new Order('317.153.361-86', new Date(), 0, 'any-destination');
	order.addItem(new Item(guitar), 1, guitar.shipping);
	order.addItem(new Item(amp), 1, amp.shipping);
	order.addItem(new Item(cable), 3, cable.shipping);
	const total = order.getTotal();
	expect(total).toBe(6250);
});

test('Deve criar um pedido com 3 itens com cupom de desconto', () => {
	const order = new Order('317.153.361-86', new Date(), 0, 'any-destination');
	order.addItem(new Item(guitar), 1, guitar.shipping);
	order.addItem(new Item(amp), 1, amp.shipping);
	order.addItem(new Item(cable), 3, cable.shipping);

	const tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	order.addCoupon(new Coupon('VALE20', 20, tomorrow));

	expect(order.getTotal()).toBe(5000);
});

test('Não deve aplicar um cupom de desconto expirado', () => {
	const order = new Order('317.153.361-86', new Date(), 0, 'any-destination');
	const yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 1);

	expect(() => {
		order.addCoupon(new Coupon('VALE20', 20, yesterday));
	}).toThrowError('Cupom expirado');
});

test('Ao fazer um pedido, a quantidade de um item não pode ser negativa', () => {
	expect(() => {
		const order = new Order('317.153.361-86', new Date(), 0, 'any-destination');
		order.addItem(new Item(guitar), -1, guitar.shipping);
	}).toThrow('Quantidade não pode ser negativa');
});

test('Ao fazer um pedido, o mesmo item não pode ser informado mais de uma vez', () => {
	expect(() => {
		const order = new Order('317.153.361-86', new Date(), 0, 'any-destination');
		order.addItem(new Item(guitar), 1, guitar.shipping);
		order.addItem(new Item(guitar), 1, guitar.shipping);
	}).toThrowError('Item duplicado');
});

test('Ao fazer um pedido, deve incluir código', () => {
	const order = new Order('317.153.361-86', new Date('2015-10-05'), 188, 'any-destination');
	expect(order.code).toBe('201500000189');
});