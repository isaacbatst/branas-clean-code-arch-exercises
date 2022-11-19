export type StockGateway = {
	decrement(idItem: number, quantity: number): Promise<void>;
	increment(idItem: number, quantity: number): Promise<void>;
};
