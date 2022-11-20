import type {GatewayFactory} from '../gateway/GatewayFactory';
import type {ItemGateway} from '../gateway/ItemGateway';
import type {ShippingGateway} from '../gateway/ShippingGateway';

type Input = {
	orderItems: Array<{
		id: number;
		quantity: number;
	}>;
	destination: string;
};

export class SimulateShipping {
	private readonly itemGateway: ItemGateway;
	private readonly shippingGateway: ShippingGateway;
	constructor(
		gatewayFactory: GatewayFactory,
	) {
		this.itemGateway = gatewayFactory.itemGateway;
		this.shippingGateway = gatewayFactory.shippingGateway;
	}

	async execute(input: Input): Promise<number> {
		const items = await Promise.all(input.orderItems.map(async ({id, quantity}) => {
			const item = await this.itemGateway.getById(id);

			return {
				item,
				quantity,
			};
		}));

		const shipping = await this.shippingGateway.calculateShipping({
			destination: input.destination,
			orderItems: items,
		});

		const total = shipping.reduce((acc, {shipping}) => shipping + acc, 0);

		return total;
	}
}
