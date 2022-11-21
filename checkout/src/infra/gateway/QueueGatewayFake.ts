import type {QueueCallback, QueueGateway} from '../../application/gateway/QueueGateway';
import type {DomainEvent} from '../../domain/events/DomainEvent';

export class QueueGatewayFake implements QueueGateway {
	readonly events: Array<DomainEvent<any>> = [];
	readonly listeners: Array<QueueCallback<any>> = [];

	async publish<T>(event: DomainEvent<T>): Promise<void> {
		this.events.push(event);
	}

	async connect(): Promise<void> {
		console.log('Fake queue connection');
	}

	async on<T>(event: string, queue: string, callback: QueueCallback<T>): Promise<void> {
		this.listeners.push(callback);
	}
}
