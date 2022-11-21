import type {QueueCallback} from '../../application/gateway/QueueGateway';
import type {Checkout} from '../../application/usecases/Checkout';
import type {OrderRequestedPayload} from '../../domain/events/OrderRequested';
import {QueueController} from './QueueController';

export class CheckoutController extends QueueController<OrderRequestedPayload> {
	constructor(
		private readonly checkout: Checkout,
	) {
		super();
	}

	protected handler: QueueCallback<OrderRequestedPayload> = async payload => {
		await this.checkout.execute(payload);
	};
}
