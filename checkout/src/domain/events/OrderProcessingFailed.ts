import {DomainEvent} from './DomainEvent';

type OrderProcessingFailedPayload = {
	code: string;
	cause: string;
};

export class OrderProcessingFailed extends DomainEvent<OrderProcessingFailedPayload> {
	name = 'orderProcessingFailed';
}
