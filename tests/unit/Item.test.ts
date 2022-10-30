import Item from '../../src/domain/entities/Item';

const negativeDimensions = [
	{height: -1, width: 10, depth: 10},
	{height: 10, width: -1, depth: 10},
	{height: 10, width: 10, depth: -1},
];

test.each(negativeDimensions)('Não deve criar um item com dimensões negativas', dimensions => {
	expect(() => {
		const item = new Item({
			description: 'Guitarra',
			id: 1,
			price: 10,
			weight: 20,
			...dimensions,
		});
	}).toThrowError('Dimensão negativa');
});

test('Não deve criar um item com peso negativo', () => {
	expect(() => {
		const item = new Item({
			description: 'Guitarra',
			height: 10,
			width: 10,
			depth: 10,
			id: 1,
			price: 10,
			weight: -1,
		});
	}).toThrow('Peso negativo');
});
