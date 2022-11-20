import {OrderCanceled} from '../../domain/events/OrderCanceled';
import type {GatewayFactory} from '../gateway/GatewayFactory';
import type {QueueGateway} from '../gateway/QueueGateway';
import type {OrderRepository} from '../repositories/OrderRepository';
import type {RepositoryFactory} from '../repositories/RepositoryFactory';

export class CancelOrder {
	private readonly orderRepository: OrderRepository;
	private readonly queueGateway: QueueGateway;
	constructor(
		repositoryFactory: RepositoryFactory,
		gatewayFactory: GatewayFactory,
	) {
		this.orderRepository = repositoryFactory.orderRepository;
		this.queueGateway = gatewayFactory.queueGateway;
	}

	async execute(code: string) {
		const order = await this.orderRepository.getByCode(code);
		order.cancel();

		await this.orderRepository.update(order);
		await this.queueGateway.publish(new OrderCanceled({
			code: order.code,
			orderItems: order.orderItems,
		}));
	}
}
