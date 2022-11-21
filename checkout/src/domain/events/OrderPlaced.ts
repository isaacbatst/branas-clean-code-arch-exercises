import {DomainEvent} from './DomainEvent';

export type OrderPlacedPayload = {
	code: string;
	orderItems: Array<{
		idItem: number;
		quantity: number;
	}>;
};

export class OrderPlaced extends DomainEvent<OrderPlacedPayload> {
	get name() {
		return 'orderPlaced';
	}
}
