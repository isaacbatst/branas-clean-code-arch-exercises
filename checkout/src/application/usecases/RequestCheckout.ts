import {OrderCodeGenerator} from '../../domain/entities/OrderCodeGenerator';
import {OrderRequest, OrderRequestStatus} from '../../domain/entities/OrderRequest';
import {OrderRequested} from '../../domain/events/OrderRequested';
import type {GatewayFactory} from '../gateway/GatewayFactory';
import type {QueueGateway} from '../gateway/QueueGateway';
import type {RepositoryFactory} from '../repositories/RepositoryFactory';
import type {OrderRequestRepository} from '../repositories/OrderRequestRepository';

type Input = {
	cpf: string;
	items: Array<{id: number; quantity: number}>;
	coupon?: string;
	destination: string;
};

export class RequestCheckout {
	private readonly queueGateway: QueueGateway;
	private readonly orderRequestRepository: OrderRequestRepository;

	constructor(
		repositoryFactory: RepositoryFactory,
		gatewayFactory: GatewayFactory,
	) {
		this.queueGateway = gatewayFactory.queueGateway;
		this.orderRequestRepository = repositoryFactory.orderRequestRepository;
	}

	async execute(input: Input) {
		const now = new Date();
		const lastRequest = await this.orderRequestRepository.getLastInsertedOnYear(now.getFullYear());
		const count = lastRequest?.getCount() ?? 0;
		const orderCode = OrderCodeGenerator.generate(now, count);
		const orderRequest = new OrderRequest(now, orderCode, OrderRequestStatus.waitingToProcess);
		await this.orderRequestRepository.save(orderRequest);
		await this.queueGateway.publish(new OrderRequested({
			...input,
			orderCode,
		}));
	}
}
