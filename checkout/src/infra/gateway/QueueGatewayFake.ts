import type {QueueGateway} from '../../application/gateway/QueueGateway';
import type {DomainEvent} from '../../domain/events/DomainEvent';

export class QueueGatewayFake implements QueueGateway {
	readonly events: Array<DomainEvent<any>> = [];

	async publish<T>(event: DomainEvent<T>): Promise<void> {
		this.events.push(event);
	}

	async connect(): Promise<void> {
		console.log('Fake queue connection');
	}
}
