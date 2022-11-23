import {DomainEvent} from './DomainEvent';

export type OrderProcessedPayload = {
	code: string;
	orderItems: Array<{
		idItem: number;
		quantity: number;
	}>;
};

export class OrderProcessed extends DomainEvent<OrderProcessedPayload> {
	get name() {
		return 'orderProcessed';
	}
}
