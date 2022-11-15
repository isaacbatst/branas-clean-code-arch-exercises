import type {City} from '../../domain/entities/City';

export type CityRepository = {
	getByCode(ibgeCode: number): Promise<City | undefined>;
};
