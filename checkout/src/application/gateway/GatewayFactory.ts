import type {ItemGateway} from './ItemGateway';
import type {QueueGateway} from './QueueGateway';
import type {ShippingGateway} from './ShippingGateway';

export type GatewayFactory = {
	itemGateway: ItemGateway;
	shippingGateway: ShippingGateway;
	queueGateway: QueueGateway;
};
