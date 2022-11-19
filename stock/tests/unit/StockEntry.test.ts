import {StockEntry} from '../../src/domain/entities/StockEntry';

test('Deve criar um registro aumento de estoque', () => {
	const stockEntry = new StockEntry(1, 1, 10, 'increment');

	expect(stockEntry.quantity).toBe(10);
});

test('Deve criar um registro diminuição de estoque', () => {
	const stockEntry = new StockEntry(1, 1, 10, 'decrement');

	expect(stockEntry.quantity).toBe(10);
});

test('Não deve criar um registro de estoque com uma operação desconhecida', () => {
	expect(() => {
		const stockEntry = new StockEntry(1, 1, 10, 'invalid-operation');
	}).toThrow('Operação de estoque inválida');
});

test('Não deve criar um registro de estoque com uma quantidade inválida', () => {
	expect(() => {
		const stockEntry = new StockEntry(1, 1, 0, 'increment');
	}).toThrow('Quantidade inválida');
});
