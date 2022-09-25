interface Dimensions {
	height: number;
	width: number;
	depth: number;
}

interface ItemParams {
	id: number,
	description: string,
	price: number,
	dimensions: Dimensions,
	weight: number,
}
export default class Item {
	readonly idItem: number
	readonly description: string 
	readonly price: number
	readonly dimensions: Dimensions
	readonly weight: number
	
	constructor (
		params: ItemParams
	) {
		if(this.isSomeDimensionNegative(params.dimensions)) throw new Error('Dimensão negativa')
		if(params.weight < 0) throw new Error('Peso negativo')

		this.idItem = params.id;
		this.description = params.description;
		this.price = params.price;
		this.weight = params.weight;
		this.dimensions = params.dimensions
	}

	private isSomeDimensionNegative(dimensions: Dimensions) {
		return dimensions.depth < 0 || dimensions.height < 0 || dimensions.width < 0
	}
}
