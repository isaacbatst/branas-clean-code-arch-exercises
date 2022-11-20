import axios from 'axios';
import type {StockGateway} from '../../application/gateway/StockGateway';
import {GatewayError} from '../../domain/errors/GatewayError';

export class StockGatewayHttp implements StockGateway {
	private readonly stockUrl: string;

	constructor() {
		if (!process.env.STOCK_SERVICE_URL) {
			throw new Error('Stock service url missing');
		}

		this.stockUrl = process.env.STOCK_SERVICE_URL;
	}

	async decrement(idItem: number, quantity: number): Promise<void> {
		try {
			await axios.post(`${this.stockUrl}/stock-entry`, {
				idItem,
				quantity,
				operation: 'decrement',
			});
		} catch (err: unknown) {
			throw new GatewayError('Erro ao atualizar estoque');
		}
	}

	async increment(idItem: number, quantity: number): Promise<void> {
		try {
			await axios.post(`${this.stockUrl}/stock-entry`, {
				idItem,
				quantity,
				operation: 'increment',
			});
		} catch (err: unknown) {
			throw new GatewayError('Erro ao atualizar estoque');
		}
	}
}
