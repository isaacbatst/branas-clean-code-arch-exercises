import type {Coordinates} from './Coordinates';

export class City {
	constructor(
		readonly ibgeCode: number,
		readonly coordinates: Coordinates,
	) {}
}
