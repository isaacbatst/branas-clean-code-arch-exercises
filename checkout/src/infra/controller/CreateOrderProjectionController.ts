import type {QueueCallback} from '../../application/gateway/QueueGateway';
import type {CreateOrderProjection} from '../../application/usecases/CreateOrderProjection';
import type {OrderPlacedPayload} from '../../domain/events/OrderPlaced';
import {QueueController} from './QueueController';

export class CreateOrderProjectionController extends QueueController<OrderPlacedPayload> {
	constructor(
		private readonly createOrderProjection: CreateOrderProjection,
	) {
		super();
	}

	protected handler: QueueCallback<OrderPlacedPayload> = async payload => {
		await this.createOrderProjection.execute(payload);
	};
}
