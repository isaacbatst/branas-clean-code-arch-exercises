import type {GatewayFactory} from '../../application/gateway/GatewayFactory';
import type {ItemGateway} from '../../application/gateway/ItemGateway';
import type {QueueGateway} from '../../application/gateway/QueueGateway';
import type {ShippingGateway} from '../../application/gateway/ShippingGateway';
import {ItemGatewayHttp} from './ItemGatewayHttp';
import {QueueGatewayAmqp} from './QueueGatewayAmqp';
import {ShippingGatewayHttp} from './ShippingGatewayHttp';

export class GatewayFactoryImpl implements GatewayFactory {
	readonly itemGateway: ItemGateway;
	readonly queueGateway: QueueGateway;
	readonly shippingGateway: ShippingGateway;

	constructor() {
		this.itemGateway = new ItemGatewayHttp();
		this.shippingGateway = new ShippingGatewayHttp();
		this.queueGateway = new QueueGatewayAmqp();
	}
}
