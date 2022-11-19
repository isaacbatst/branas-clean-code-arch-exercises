import {Checkout} from '../../../src/application/usecases/Checkout';
import Coupon from '../../../src/domain/entities/Coupon';
import {ItemGatewayFake} from '../../../src/infra/gateway/ItemGatewayFake';
import {ShippingGatewayFake} from '../../../src/infra/gateway/ShippingGatewayFake';
import {StockGatewayFake} from '../../../src/infra/gateway/StockGatewayFake';
import {CouponRepositoryMemory} from '../../../src/infra/persistence/memory/CouponRepositoryMemory';
import {OrderProjectionRepositoryMemory} from '../../../src/infra/persistence/memory/OrderProjectionRepositoryMemory';
import {OrderRepositoryMemory} from '../../../src/infra/persistence/memory/OrderRepositoryMemory';

const makeSut = async () => {
	const orderRepository = new OrderRepositoryMemory();
	const couponRepository = new CouponRepositoryMemory();
	const shippingGateway = new ShippingGatewayFake();
	const itemGateway = new ItemGatewayFake();
	const orderProjectionRepository = new OrderProjectionRepositoryMemory();
	const stockGateway = new StockGatewayFake();
	const checkout = new Checkout(orderRepository, orderProjectionRepository, couponRepository, itemGateway, shippingGateway, stockGateway);

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

	expect(created.total).toBe(1010);
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

	expect(created.total).toBe(7030);
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

	expect(created.total).toBe(4816);
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
	}).rejects.toThrow('Cupom não encontrado');
});
