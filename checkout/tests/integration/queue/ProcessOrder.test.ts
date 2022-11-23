import {App} from '../../../src/app';
import {OrderRequested} from '../../../src/domain/events/OrderRequested';
import {GatewayFactoryFake} from '../../../src/infra/gateway/GatewayFactoryFake';

const makeSut = async () => {
	const gatewayFactory = new GatewayFactoryFake();
	const app = new App(gatewayFactory);

	await app.init();

	return {
		app,
		gatewayFactory,
	};
};

test('Após "orderRequested" pedido com um item é processado', async () => {
	const {app, gatewayFactory} = await makeSut();
	console.log(gatewayFactory.queueGateway.listeners);

	await gatewayFactory.queueGateway.publish(new OrderRequested({
		cpf: '317.153.361-86',
		items: [
			{
				id: 1,
				quantity: 1,
			},
		],
		destination: '71692-404',
		orderCode: '202200000002',
	}));

	const year = new Date().getFullYear();
	const order = await app.repositoryFactory.orderRepository.getByCode(`${year}00000002`);

	expect(order.getTotal()).toBe(1010);
});

test('Após "orderRequested" pedido com dois itens é processado', async () => {
	const {app, gatewayFactory} = await makeSut();

	await gatewayFactory.queueGateway.publish(new OrderRequested({
		cpf: '317.153.361-86',
		items: [
			{
				id: 1,
				quantity: 2,
			},
			{
				id: 2,
				quantity: 1,
			},
		],
		destination: '71692-404',
		orderCode: '202200000003',
	}));

	const year = new Date().getFullYear();
	const order = await app.repositoryFactory.orderRepository.getByCode(`${year}00000003`);

	expect(order.getTotal()).toBe(7030);
});

test('Após "orderRequested" pedido com cupom de desconto é processado', async () => {
	const {app, gatewayFactory} = await makeSut();
	await gatewayFactory.queueGateway.publish(new OrderRequested({
		cpf: '317.153.361-86',
		items: [
			{
				id: 1,
				quantity: 1,
			},
			{
				id: 2,
				quantity: 1,
			},
		],
		coupon: 'VALE20',
		destination: '71692-404',
		orderCode: '202200000004',
	}));

	const year = new Date().getFullYear();
	const order = await app.repositoryFactory.orderRepository.getByCode(`${year}00000004`);

	expect(order.getTotal()).toBe(4816);
});

test('Após "orderRequest" pedido com cupom inexistente não é processado', async () => {
	const {app, gatewayFactory} = await makeSut();
	await gatewayFactory.queueGateway.publish(new OrderRequested({
		cpf: '317.153.361-86',
		items: [
			{
				id: 1,
				quantity: 1,
			},
			{
				id: 2,
				quantity: 1,
			},
		],
		coupon: 'VALE30',
		destination: '71692-404',
		orderCode: '202200000005',
	}));

	const count = await app.repositoryFactory.orderRepository.getCount();

	expect(count).toBe(4);
});

