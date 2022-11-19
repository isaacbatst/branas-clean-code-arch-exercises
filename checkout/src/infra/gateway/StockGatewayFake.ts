import type {StockGateway} from '../../application/gateway/StockGateway';

export class StockGatewayFake implements StockGateway {
	private readonly stocks: Array<{idItem: number; quantity: number; operation: string}> = [];

	async decrement(idItem: number, quantity: number): Promise<void> {
		this.stocks.push({idItem, quantity, operation: 'decrement'});
	}

	async increment(idItem: number, quantity: number): Promise<void> {
		this.stocks.push({idItem, quantity, operation: 'increment'});
	}
}
