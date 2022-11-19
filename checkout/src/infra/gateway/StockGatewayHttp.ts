import axios from 'axios';
import type {StockGateway} from '../../application/gateway/StockGateway';
import Item from '../../domain/entities/Item';
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
			await axios.post('/stock-entry', {
				idItem,
				quantity,
				operation: 'decrement',
			});
		} catch (err: unknown) {
			throw new GatewayError('Erro ao atualizar estoque');
		}
	}
}
