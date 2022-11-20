import {DomainEvent} from './DomainEvent';

type OrderPlacedPayload = {
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
