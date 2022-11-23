import type {QueueCallback} from '../../application/gateway/QueueGateway';
import type {DecrementStock} from '../../application/usecases/DecrementStock';
import type {OrderProcessedPayload} from '../../domain/events/OrderProcessed';
import {QueueController} from './QueueController';

export class DecrementStockController extends QueueController<OrderProcessedPayload> {
	constructor(
		private readonly decrementStock: DecrementStock,
	) {
		super();
	}

	protected handler: QueueCallback<OrderProcessedPayload> = async msg => {
		await this.decrementStock.execute(msg);
	};
}
