export default class Coupon {
	constructor(
		readonly code: string,
		readonly percentage: number,
		readonly expirationDate: Date) {
	}

	calculateDiscount(total: number) {
		return (total * this.percentage) / 100;
	}
}
