import {DomainEvent} from './DomainEvent';

export type OrderRequestedPayload = {
	cpf: string;
	items: Array<{id: number; quantity: number}>;
	coupon?: string;
	destination: string;
	orderCode: string;
};

export class OrderRequested extends DomainEvent<OrderRequestedPayload> {
	name = 'orderRequested';
}
