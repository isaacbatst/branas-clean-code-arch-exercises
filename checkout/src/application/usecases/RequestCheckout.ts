import {OrderRequest} from '../../domain/entities/RequestedOrder';
import {OrderRequested} from '../../domain/events/OrderRequested';
import type {GatewayFactory} from '../gateway/GatewayFactory';
import type {QueueGateway} from '../gateway/QueueGateway';
import type {RepositoryFactory} from '../repositories/RepositoryFactory';
import type {RequestedOrderRepository} from '../repositories/RequestedOrderRepository';

type Input = {
	cpf: string;
	items: Array<{id: number; quantity: number}>;
	coupon?: string;
	destination: string;
};

export class RequestCheckout {
	private readonly queueGateway: QueueGateway;
	private readonly requestedOrderRepository: RequestedOrderRepository;

	constructor(
		repositoryFactory: RepositoryFactory,
		gatewayFactory: GatewayFactory,
	) {
		this.queueGateway = gatewayFactory.queueGateway;
		this.requestedOrderRepository = repositoryFactory.requestedOrderRepository;
	}

	async execute(input: Input) {
		const now = new Date();
		const lastRequested = await this.requestedOrderRepository.getLastInsertedOnYear(now.getFullYear());
		const count = lastRequested?.count ?? 0;
		const orderRequest = new OrderRequest(new Date(), count + 1);
		await this.requestedOrderRepository.save(orderRequest);
		await this.queueGateway.publish(new OrderRequested({
			...input,
			count,
		}));
	}
}
