import type {DomainEvent} from '../../domain/events/DomainEvent';

export type QueueGateway = {
	publish<T>(event: DomainEvent<T>): Promise<void>;
};
