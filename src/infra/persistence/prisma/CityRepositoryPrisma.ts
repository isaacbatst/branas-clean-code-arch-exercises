import type {CityRepository} from '../../../application/repositories/CityRepository';
import {City} from '../../../domain/entities/City';
import prisma from './prisma';

export class CityRepositoryPrisma implements CityRepository {
	async getByCode(ibgeCode: number): Promise<City | undefined> {
		const city = await prisma.city.findUnique({
			where: {
				ibgeCode,
			},
		});

		if (!city) {
			return;
		}

		return new City({
			lat: city.latitude.toNumber(),
			long: city.longitude.toNumber(),
		});
	}
}
