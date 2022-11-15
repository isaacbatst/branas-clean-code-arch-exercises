import type {CityRepository} from '../../../application/repositories/CityRepository';
import {City} from '../../../domain/entities/City';
import {Coordinates} from '../../../domain/entities/Coordinates';

export class CityRepositoryMemory implements CityRepository {
	private readonly cities: City[];

	constructor() {
		this.cities = [
			new City(5300108, new Coordinates(-15.7795, -47.9297)),
			new City(3205036, new Coordinates(-20.669, -41.0179)),
			new City(2401008, new Coordinates(-5.65349, -37.7946)),
		];
	}

	async getByCode(ibgeCode: number): Promise<City | undefined> {
		return this.cities.find(city => city.ibgeCode === ibgeCode);
	}

	async save(city: City) {
		this.cities.push(city);
	}
}
