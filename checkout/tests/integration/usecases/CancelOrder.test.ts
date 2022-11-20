import {CancelOrder} from '../../../src/application/usecases/CancelOrder';
import Order from '../../../src/domain/entities/Order';
import {OrderStatuses} from '../../../src/domain/entities/OrderStatus';
import {GatewayFactoryFake} from '../../../src/infra/gateway/GatewayFactoryFake';
import {RepositoryFactoryMemory} from '../../../src/infra/persistence/memory/RepositoryFactoryMemory';

const makeSut = () => {
	const repositoryFactory = new RepositoryFactoryMemory();
	const gatewayFactory = new GatewayFactoryFake();
	const cancelOrder = new CancelOrder(repositoryFactory, gatewayFactory);

	return {
		cancelOrder,
		orderRepository: repositoryFactory.orderRepository,
		queueGateway: gatewayFactory.queueGateway,
	};
};

test('Ao cancelar o pedido deve persistir informação', async () => {
	const {cancelOrder, orderRepository} = makeSut();
	const now = new Date();
	const order = new Order('317.153.361-86', now, 'any-code', 'any-destination', OrderStatuses.waitingPayment);
	await orderRepository.save(order);

	await cancelOrder.execute(order.code);

	const updatedOrder = await orderRepository.getByCode(order.code);
	expect(updatedOrder).not.toBeUndefined();
	expect((updatedOrder).getStatus()).toBe(OrderStatuses.canceled);
});

test('Ao cancelar o pedido já cancelado, deve retornar erro', async () => {
	const {cancelOrder, orderRepository} = makeSut();
	const now = new Date();
	const order = new Order('317.153.361-86', now, 'any-code', 'any-destination', OrderStatuses.canceled);
	await orderRepository.save(order);

	await expect(async () => {
		await cancelOrder.execute(order.code);
	}).rejects.toThrow('Pedido já cancelado');
});

test('Ao cancelar o pedido já enviado, deve retornar erro', async () => {
	const {cancelOrder, orderRepository} = makeSut();
	const now = new Date();
	const order = new Order('317.153.361-86', now, 'any-code', 'any-destination', OrderStatuses.shipped);
	await orderRepository.save(order);

	await expect(async () => {
		await cancelOrder.execute(order.code);
	}).rejects.toThrow('Pedido já enviado');
});

test('Ao cancelar o pedido deve publicar evento', async () => {
	const {cancelOrder, orderRepository, queueGateway} = makeSut();
	const now = new Date();
	const order = new Order('317.153.361-86', now, 'any-code', 'any-destination', OrderStatuses.waitingPayment);
	await orderRepository.save(order);

	await cancelOrder.execute(order.code);
	expect(queueGateway.events).toHaveLength(1);
});


