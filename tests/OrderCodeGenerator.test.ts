import {OrderCodeGenerator} from '../src/domain/entities/OrderCodeGenerator';

const inputs: Array<{date: Date; count: number; expected: string}> = [
	{date: new Date('1995-12-17'), count: 0, expected: '199500000001'},
	{date: new Date('2020-10-10'), count: 200, expected: '202000000201'},
	{date: new Date('2015-01-20'), count: 188, expected: '201500000189'},
];

test.each(inputs)('should generate a code', input => {
	const code = OrderCodeGenerator.generate(input.date, input.count);

	expect(code).toBe(input.expected);
});
