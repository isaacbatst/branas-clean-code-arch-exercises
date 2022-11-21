import type {QueueCallback} from '../../application/gateway/QueueGateway';
import type {DecrementStock} from '../../application/usecases/DecrementStock';
import type {OrderPlacedPayload} from '../../domain/events/OrderPlaced';
import {QueueController} from './QueueController';

export class DecrementStockController extends QueueController<OrderPlacedPayload> {
	constructor(
		private readonly decrementStock: DecrementStock,
	) {
		super();
	}

	protected handler: QueueCallback<OrderPlacedPayload> = async msg => {
		await this.decrementStock.execute(msg);
	};
}
