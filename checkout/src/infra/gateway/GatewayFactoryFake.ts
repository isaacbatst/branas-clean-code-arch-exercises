import type {GatewayFactory} from '../../application/gateway/GatewayFactory';
import type {ItemGateway} from '../../application/gateway/ItemGateway';
import type {ShippingGateway} from '../../application/gateway/ShippingGateway';
import {ItemGatewayFake} from './ItemGatewayFake';
import {QueueGatewayFake} from './QueueGatewayFake';
import {ShippingGatewayFake} from './ShippingGatewayFake';

export class GatewayFactoryFake implements GatewayFactory {
	readonly itemGateway: ItemGateway;
	readonly queueGateway: QueueGatewayFake;
	readonly shippingGateway: ShippingGateway;

	constructor() {
		this.itemGateway = new ItemGatewayFake();
		this.shippingGateway = new ShippingGatewayFake();
		this.queueGateway = new QueueGatewayFake();
	}
}
