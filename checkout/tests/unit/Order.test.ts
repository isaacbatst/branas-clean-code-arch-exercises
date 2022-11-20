import Coupon from '../../src/domain/entities/Coupon';
import Order from '../../src/domain/entities/Order';
import {OrderStatuses} from '../../src/domain/entities/OrderStatus';

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
	expect(() => new Order('111.111.111-11', new Date(), 'any-code', 'any-destination', OrderStatuses.waitingPayment)).toThrow('INVALID_CPF');
});

test('Deve criar um pedido sem itens', () => {
	const order = new Order('317.153.361-86', new Date(), 'any-code', 'any-destination', OrderStatuses.waitingPayment);
	const total = order.getTotal();
	expect(total).toBe(0);
});

test('Deve criar um pedido com 3 itens', () => {
	const order = new Order('317.153.361-86', new Date(), 'any-code', 'any-destination', OrderStatuses.waitingPayment);
	order.addItem({idItem: guitar.id, price: guitar.price, quantity: 1, shipping: guitar.shipping});
	order.addItem({idItem: amp.id, price: amp.price, quantity: 1, shipping: amp.shipping});
	order.addItem({idItem: cable.id, price: cable.price, quantity: 3, shipping: cable.shipping});
	const total = order.getTotal();
	expect(total).toBe(6250);
});

test('Deve criar um pedido com 3 itens com cupom de desconto', () => {
	const order = new Order('317.153.361-86', new Date(), 'any-code', 'any-destination', OrderStatuses.waitingPayment);
	order.addItem({idItem: guitar.id, price: guitar.price, quantity: 1, shipping: guitar.shipping});
	order.addItem({idItem: amp.id, price: amp.price, quantity: 1, shipping: amp.shipping});
	order.addItem({idItem: cable.id, price: cable.price, quantity: 3, shipping: cable.shipping});

	const tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	order.addCoupon(new Coupon('VALE20', 20, tomorrow));

	expect(order.getTotal()).toBe(5000);
});

test('Não deve aplicar um cupom de desconto expirado', () => {
	const order = new Order('317.153.361-86', new Date(), 'any-code', 'any-destination', OrderStatuses.waitingPayment);
	const yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 1);

	expect(() => {
		order.addCoupon(new Coupon('VALE20', 20, yesterday));
	}).toThrowError('Cupom expirado');
});

test('Ao fazer um pedido, a quantidade de um item não pode ser negativa', () => {
	expect(() => {
		const order = new Order('317.153.361-86', new Date(), 'any-code', 'any-destination', OrderStatuses.waitingPayment);
		order.addItem({idItem: guitar.id, price: guitar.price, quantity: -1, shipping: guitar.shipping});
	}).toThrow('Quantidade não pode ser negativa');
});

test('Ao fazer um pedido, o mesmo item não pode ser informado mais de uma vez', () => {
	expect(() => {
		const order = new Order('317.153.361-86', new Date(), 'any-code', 'any-destination', OrderStatuses.waitingPayment);
		order.addItem({idItem: guitar.id, price: guitar.price, quantity: 1, shipping: guitar.shipping});
		order.addItem({idItem: guitar.id, price: guitar.price, quantity: 1, shipping: guitar.shipping});
	}).toThrowError('Item duplicado');
});

test('Ao fazer pedido, deve ser possível cancelá-lo', () => {
	const order = new Order('317.153.361-86', new Date('2015-10-05'), 'any-code', 'any-destination', OrderStatuses.waitingPayment);
	order.cancel();
	expect(order.getStatus()).toBe(OrderStatuses.canceled);
});
