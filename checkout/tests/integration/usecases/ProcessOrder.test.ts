import {ProcessOrder} from '../../../src/application/usecases/ProcessOrder';
import Coupon from '../../../src/domain/entities/Coupon';
import {GatewayFactoryFake} from '../../../src/infra/gateway/GatewayFactoryFake';
import {RepositoryFactoryMemory} from '../../../src/infra/persistence/memory/RepositoryFactoryMemory';

const makeSut = async () => {
	const repositoryFactory = new RepositoryFactoryMemory();
	const gatewayFactory = new GatewayFactoryFake();
	const processOrder = new ProcessOrder(repositoryFactory, gatewayFactory);

	return {
		orderRepository: repositoryFactory.orderRepository,
		couponRepository: repositoryFactory.couponRepository,
		queueGateway: gatewayFactory.queueGateway,
		processOrder,
	};
};

test('Ao criar o pedido com um item deve calcular o total', async () => {
	const {processOrder, orderRepository} = await makeSut();

	await processOrder.execute({
		cpf: '317.153.361-86',
		items: [
			{id: 1, quantity: 1},
		],
		destination: 'any-destination',
		orderCode: '202200000001',
	});

	const order = await orderRepository.getByCode('202200000001');

	expect(order).toBeDefined();
});

test('Ao criar o pedido com dois itens deve calcular o total', async () => {
	const {processOrder, orderRepository} = await makeSut();

	await processOrder.execute({
		cpf: '317.153.361-86',
		items: [
			{id: 1, quantity: 2},
			{id: 2, quantity: 1},
		],
		destination: 'any-destination',
		orderCode: '202200000001',
	});

	const order = await orderRepository.getByCode('202200000001');

	expect(order.getTotal()).toBe(7030);
});

test('Ao criar o pedido com cupom de desconto deve calcular o total', async () => {
	const {processOrder, couponRepository, orderRepository} = await makeSut();
	const tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	await couponRepository.save(new Coupon('VALE20', 20, tomorrow));

	await processOrder.execute({
		cpf: '317.153.361-86',
		items: [
			{id: 1, quantity: 1},
			{id: 2, quantity: 1},
		],
		coupon: 'VALE20',
		destination: 'any-destination',
		orderCode: '202200000001',
	});

	const order = await orderRepository.getByCode('202200000001');

	expect(order.getTotal()).toBe(4816);
});

test('Ao criar pedido com cupom inexistente deve lançar erro', async () => {
	const {processOrder, queueGateway} = await makeSut();
	const spy = jest.fn();

	await queueGateway.on('orderProcessingFailed', 'orderProcessingFailed.test', spy);

	await processOrder.execute({
		cpf: '317.153.361-86',
		items: [
			{id: 1, quantity: 1},
			{id: 2, quantity: 1},
		],
		coupon: 'VALE20',
		destination: 'any-destination',
		orderCode: '202200000001',
	});

	expect(spy).toHaveBeenCalledWith({
		code: '202200000001',
		cause: 'Cupom não encontrado',
	});
});

test('Ao criar o pedido com um item deve publicar evento', async () => {
	const {processOrder, queueGateway} = await makeSut();

	const spy = jest.fn();

	await queueGateway.on('orderProcessed', 'orderProcessed.test', spy);

	await processOrder.execute({
		cpf: '317.153.361-86',
		items: [
			{id: 1, quantity: 1},
		],
		destination: 'any-destination',
		orderCode: '202200000001',
	});

	expect(spy).toHaveBeenCalledWith({code: '202200000001', orderItems: [{idItem: 1, price: 1000, quantity: 1, shipping: 10}]});
});
