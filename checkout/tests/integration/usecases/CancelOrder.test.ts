import {CancelOrder} from '../../../src/application/usecases/CancelOrder';
import Order from '../../../src/domain/entities/Order';
import {OrderStatuses} from '../../../src/domain/entities/OrderStatus';
import {StockGatewayFake} from '../../../src/infra/gateway/StockGatewayFake';
import {OrderRepositoryMemory} from '../../../src/infra/persistence/memory/OrderRepositoryMemory';

const makeSut = () => {
	const stockGateway = new StockGatewayFake();
	const orderRepository = new OrderRepositoryMemory();

	const cancelOrder = new CancelOrder(orderRepository, stockGateway);

	return {
		cancelOrder, orderRepository,
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

