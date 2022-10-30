import {Dimensions} from '../src/domain/entities/Dimensions';
import type {ShippableItem} from '../src/domain/entities/ShippingCalculator';
import ShippingCalculator from '../src/domain/entities/ShippingCalculator';

const items: Array<{expected: number; name: string; item: ShippableItem}> = [
	{
		name: 'guitar',
		expected: 30,
		item: {
			dimensions: new Dimensions(100, 30, 10),
			weight: 3,
		},
	},
	{
		name: 'camera',
		expected: 10,
		item: {
			dimensions: new Dimensions(15, 20, 10),
			weight: 1,
		},
	},
	{
		name: 'refrigerator',
		expected: 400,
		item: {
			dimensions: new Dimensions(200, 100, 50),
			weight: 40,
		},
	},
];

test.each(items)('Deve calcular o frete de %s', ({item, expected}) => {
	const shipping = ShippingCalculator.calculate(item);

	expect(shipping).toBe(expected);
});
