import {Dimensions} from '../src/domain/entities/Dimensions';
import Shipping from '../src/domain/entities/Shipping';

const items: Array<{expected: number; dimensions: Dimensions; weight: number}> = [
	{
		expected: 30,
		dimensions: new Dimensions(100, 30, 10),
		weight: 3,
	},
	{
		expected: 10,
		dimensions: new Dimensions(15, 20, 10),
		weight: 1,
	},
	{
		expected: 400,
		dimensions: new Dimensions(200, 100, 50),
		weight: 40,
	},
];

test.each(items)('Deve calcular o frete', item => {
	const shipping = new Shipping();
	shipping.addItem(item.dimensions, item.weight);

	expect(shipping.getValue()).toBe(item.expected);
});
