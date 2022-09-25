import Coupon from "../src/Coupon";
import Item from "../src/Item";
import Order from "../src/Order";

const guitar = {
	id: 1, 
	description: 'Guitarra', 
	dimensions: {
		depth: 5,
		height: 100,
		width: 40
	},
	price: 1000,
	weight: 2
}

const amp = {
	id: 2, 
	description: 'amp', 
	dimensions: {
		depth: 5,
		height: 100,
		width: 40
	},
	price: 5000,
	weight: 2
}

const cable = {
	id: 3, 
	description: 'cabo', 
	dimensions: {
		depth: 5,
		height: 100,
		width: 40
	},
	price: 30,
	weight: 5
}

test("Não deve criar um pedido com CPF inválido", function () {
	expect(() => new Order("111.111.111-11")).toThrow(new Error("Cpf inválido"));
});

test("Deve criar um pedido sem itens", function () {
	const order = new Order("317.153.361-86");
	const total = order.getTotal();
	expect(total).toBe(0);
});

test("Deve criar um pedido com 3 itens", function () {
	const order = new Order("317.153.361-86");
	order.addItem(new Item(guitar), 1);
	order.addItem(new Item(amp), 1);
	order.addItem(new Item(cable), 3);
	const total = order.getTotal();
	expect(total).toBe(6090);
});

test("Deve criar um pedido com 3 itens com cupom de desconto", function () {
	const order = new Order("317.153.361-86");
	order.addItem(new Item(guitar), 1);
	order.addItem(new Item(amp), 1);
	order.addItem(new Item(cable), 3);
	order.addCoupon(new Coupon("VALE20", 20, new Date()));
	const total = order.getTotal();
	expect(total).toBe(4872);
});

test("Não deve aplicar um cupom de desconto expirado", function () {
	const order = new Order("317.153.361-86");
	const yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 1);
	
	expect(() => {
		order.addCoupon(new Coupon("VALE20", 20, yesterday));
	}).toThrowError('Cupom expirado')
})

test("Ao fazer um pedido, a quantidade de um item não pode ser negativa", function() {
	expect(() => {
		const order = new Order("317.153.361-86");
		order.addItem(new Item(guitar), -1);
	}).toThrow('Quantidade não pode ser negativa')
})

test("Ao fazer um pedido, o mesmo item não pode ser informado mais de uma vez", function() {
	expect(() => {
		const order = new Order("317.153.361-86");
		order.addItem(new Item(guitar), 1);
		order.addItem(new Item(guitar), 1);
	}).toThrowError("Item duplicado")
})