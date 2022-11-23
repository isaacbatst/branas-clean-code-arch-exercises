export enum OrderRequestStatus {
	waitingToProcess = 'waitingToProcess',
	processed = 'processed',
	failed = 'failed',
}

export class OrderRequest {
	constructor(
		readonly date: Date,
		readonly orderCode: string,
		readonly status: OrderRequestStatus,
	) {}

	getCount(): number {
		return Number(this.orderCode.substring(4));
	}

	getYear(): number {
		return Number(this.orderCode.substring(0, 4));
	}
}
