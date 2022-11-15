export class Dimensions {
	constructor(readonly height: number,
		readonly width: number,
		readonly depth: number) {
		if (this.isSomeDimensionNegative()) {
			throw new Error('Dimensão negativa');
		}
	}

	private isSomeDimensionNegative() {
		return this.depth < 0 || this.height < 0 || this.width < 0;
	}
}
