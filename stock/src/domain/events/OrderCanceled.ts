import {DomainEvent} from './DomainEvent';

type OrderCanceledPayload = {
	code: string;
	orderItems: Array<{
		idItem: number;
		quantity: number;
	}>;
};

export class OrderCanceled extends DomainEvent<OrderCanceledPayload> {
	name = 'orderCanceled';
}
