enum StockEntryOperation {
	increment = 'increment',
	decrement = 'decrement',
}

export class StockEntry {
	private static validateOperation(operation: string): operation is StockEntryOperation {
		return operation in StockEntryOperation;
	}

	readonly operation: StockEntryOperation;

	constructor(
		readonly id: string,
		readonly idItem: number,
		readonly quantity: number,
		readonly createdAt: Date,
		operation: string,
	) {
		if (!StockEntry.validateOperation(operation)) {
			throw new Error('Operação de estoque inválida');
		}

		if (quantity <= 0) {
			throw new Error('Quantidade inválida');
		}

		this.operation = operation;
	}
}
