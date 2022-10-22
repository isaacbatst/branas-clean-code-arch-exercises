export class OrderCodeGenerator {
	static generate(date: Date, ordersCount: number): string {
		const year = date.getFullYear();
		const sequence = ordersCount + 1;

		return `${year}${sequence.toString().padStart(8, '0')}`;
	}
}
