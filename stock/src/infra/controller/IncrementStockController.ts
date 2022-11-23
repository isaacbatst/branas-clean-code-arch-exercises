import type {QueueCallback} from '../../application/gateway/QueueGateway';
import type {IncrementStock} from '../../application/usecases/IncrementStock';
import type {OrderProcessedPayload} from '../../domain/events/OrderProcessed';
import {QueueController} from './QueueController';

export class IncrementStockController extends QueueController<OrderProcessedPayload> {
	constructor(
		private readonly incrementStock: IncrementStock,
	) {
		super();
	}

	protected handler: QueueCallback<OrderProcessedPayload> = async msg => {
		await this.incrementStock.execute(msg);
	};
}
