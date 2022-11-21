import type {QueueCallback} from '../../application/gateway/QueueGateway';
import type {IncrementStock} from '../../application/usecases/IncrementStock';
import type {OrderPlacedPayload} from '../../domain/events/OrderPlaced';
import {QueueController} from './QueueController';

export class IncrementStockController extends QueueController<OrderPlacedPayload> {
	constructor(
		private readonly incrementStock: IncrementStock,
	) {
		super();
	}

	protected handler: QueueCallback<OrderPlacedPayload> = async msg => {
		await this.incrementStock.execute(msg);
	};
}
