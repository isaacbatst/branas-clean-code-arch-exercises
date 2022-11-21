import type {DomainEvent} from '../../domain/events/DomainEvent';

export type QueueGateway = {
	publish<T>(event: DomainEvent<T>): Promise<void>;
	on<T>(event: string, queue: string, callback: (payload: T) => Promise<void>): Promise<void>;
};
