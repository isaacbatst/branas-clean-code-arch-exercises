import type {ShippableItem} from '../../src/domain/entities/ShippingCalculator';
import ShippingCalculator from '../../src/domain/entities/ShippingCalculator';

const items: Array<{expected: number; name: string; item: ShippableItem}> = [
	{
		name: 'guitar',
		expected: 30,
		item: {
			dimensions: {
				depth: 10,
				height: 100,
				width: 30,
			},
			weight: 3,
		},
	},
	{
		name: 'camera',
		expected: 10,
		item: {
			dimensions: {
				height: 15,
				width: 20,
				depth: 10,
			},
			weight: 1,
		},
	},
	{
		name: 'refrigerator',
		expected: 400,
		item: {
			dimensions: {
				height: 200,
				width: 100,
				depth: 50,
			},
			weight: 40,
		},
	},
];

test.each(items)('Deve calcular o frete de %s', ({item, expected}) => {
	const shipping = ShippingCalculator.calculate(item);

	expect(shipping).toBe(expected);
});
