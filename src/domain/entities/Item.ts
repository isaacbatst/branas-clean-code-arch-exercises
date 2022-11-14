import {Dimensions} from './Dimensions';

export type ItemParams = {
	id: number;
	description: string;
	price: number;
	weight: number;
	height: number;
	width: number;
	depth: number;
	addressCep: string;
};

export default class Item {
	readonly idItem: number;
	readonly description: string;
	readonly price: number;
	readonly dimensions: Dimensions;
	readonly weight: number;
	readonly addressCep: string;

	constructor(
		params: ItemParams,
	) {
		this.idItem = params.id;
		this.description = params.description;
		this.price = params.price;
		this.weight = params.weight;
		this.addressCep = params.addressCep;
		this.dimensions = new Dimensions(params.height, params.width, params.depth);

		if (params.weight < 0) {
			throw new Error('Peso negativo');
		}
	}
}
