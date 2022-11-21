import type {GatewayFactory} from '../gateway/GatewayFactory';
import type {ItemDto, ItemGateway} from '../gateway/ItemGateway';
import type {OrderProjectionRepository} from '../repositories/OrderProjectionRepository';
import type {OrderRepository} from '../repositories/OrderRepository';
import type {RepositoryFactory} from '../repositories/RepositoryFactory';

export class CreateOrderProjection {
	private readonly orderRepository: OrderRepository;
	private readonly orderProjectionRepository: OrderProjectionRepository;
	private readonly itemGateway: ItemGateway;
	constructor(
		repositoryFactory: RepositoryFactory,
		gatewayFactory: GatewayFactory,
	) {
		this.orderRepository = repositoryFactory.orderRepository;
		this.orderProjectionRepository = repositoryFactory.orderProjectionRepository;
		this.itemGateway = gatewayFactory.itemGateway;
	}

	async execute(input: {
		code: string;
	}) {
		const order = await this.orderRepository.getByCode(input.code);

		const items: ItemDto[] = await this.itemGateway.getItems(order.orderItems.map(({idItem}) => idItem));

		await this.orderProjectionRepository.save(order, items);
	}
}
