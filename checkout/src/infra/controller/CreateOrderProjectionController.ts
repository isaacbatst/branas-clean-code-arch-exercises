import type {QueueCallback} from '../../application/gateway/QueueGateway';
import type {CreateOrderProjection} from '../../application/usecases/CreateOrderProjection';
import type {OrderProcessedPayload} from '../../domain/events/OrderProcessed';
import {QueueController} from './QueueController';

export class CreateOrderProjectionController extends QueueController<OrderProcessedPayload> {
	constructor(
		private readonly createOrderProjection: CreateOrderProjection,
	) {
		super();
	}

	protected handler: QueueCallback<OrderProcessedPayload> = async payload => {
		await this.createOrderProjection.execute(payload);
	};
}
