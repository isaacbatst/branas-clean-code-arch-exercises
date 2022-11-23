import type {QueueCallback} from '../../application/gateway/QueueGateway';
import type {ProcessOrder} from '../../application/usecases/ProcessOrder';
import type {OrderRequestedPayload} from '../../domain/events/OrderRequested';
import {QueueController} from './QueueController';

export class CheckoutController extends QueueController<OrderRequestedPayload> {
	constructor(
		private readonly processOrder: ProcessOrder,
	) {
		super();
	}

	protected handler: QueueCallback<OrderRequestedPayload> = async payload => {
		await this.processOrder.execute(payload);
	};
}
