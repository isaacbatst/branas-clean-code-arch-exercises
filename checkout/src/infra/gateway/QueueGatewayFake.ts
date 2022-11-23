import type {QueueCallback, QueueGateway} from '../../application/gateway/QueueGateway';
import type {DomainEvent} from '../../domain/events/DomainEvent';

export class QueueGatewayFake implements QueueGateway {
	readonly listeners: Record<string, Array<QueueCallback<any>>> = {};

	async publish<T>(event: DomainEvent<T>): Promise<void> {
		if (!this.listeners[event.name]) {
			this.listeners[event.name] = [];
		}

		const listeners = Object.values(this.listeners[event.name]);

		await Promise.all(listeners.map(async listener => listener(event.payload)));
	}

	async on<T>(event: string, queue: string, callback: QueueCallback<T>): Promise<void> {
		if (!this.listeners[event]) {
			this.listeners[event] = [callback];
			return;
		}

		this.listeners[event].push(callback);
	}
}
