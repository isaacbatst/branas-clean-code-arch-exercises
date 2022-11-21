import type {DomainEvent} from '../../domain/events/DomainEvent';

export type QueueCallback<T> = (payload: T) => Promise<void>;

export type QueueGateway = {
	publish<T>(event: DomainEvent<T>): Promise<void>;
	on<T>(event: string, queue: string, callback: QueueCallback<T>): Promise<void>;
};
