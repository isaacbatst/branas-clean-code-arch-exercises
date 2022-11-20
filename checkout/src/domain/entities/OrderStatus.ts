export enum OrderStatuses {
	waitingPayment = 'waitingPayment',
	canceled = 'canceled',
	shipped = 'shipped',
}

export class OrderStatus {
	readonly value: OrderStatuses;

	constructor(
		value: string,
	) {
		if (!this.validateStatus(value)) {
			throw new Error('Status de pedido inválido');
		}

		this.value = value;
	}

	private validateStatus(status: string): status is OrderStatuses {
		return status in OrderStatuses;
	}
}
