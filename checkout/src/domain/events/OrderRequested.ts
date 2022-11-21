import {DomainEvent} from './DomainEvent';

export type OrderRequestedPayload = {
	cpf: string;
	items: Array<{id: number; quantity: number}>;
	coupon?: string;
	destination: string;
	count: number;
};

export class OrderRequested extends DomainEvent<OrderRequestedPayload> {
	name = 'orderRequested';
}
