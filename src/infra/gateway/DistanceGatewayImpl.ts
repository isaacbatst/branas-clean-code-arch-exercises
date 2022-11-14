import {NotFoundError} from '@prisma/client/runtime';
import type {AddressGateway} from '../../application/gateway/AddressGateway';
import type {DistanceGateway} from '../../application/gateway/DistanceGateway';
import type {CityRepository} from '../../application/repositories/CityRepository';
import type {Coordinates} from '../../domain/entities/Coordinates';
import {DistanceCalculator} from '../../domain/entities/DistanceCalculator';

export class DistanceGatewayImpl implements DistanceGateway {
	constructor(
		private readonly addressGateway: AddressGateway,
		private readonly cityRepository: CityRepository,
	) {}

	async getDistanceByCep(originCep: string, destinationCep: string): Promise<number> {
		const originCoordinates = await this.getCoordinatesByCep(originCep);
		const destinationCoordinantes = await this.getCoordinatesByCep(destinationCep);
		const distance = DistanceCalculator.calculate(originCoordinates, destinationCoordinantes);
		return distance;
	}

	private async getCoordinatesByCep(cep: string): Promise<Coordinates> {
		const ibgeCode = await this.addressGateway.getIbgeCodeByCep(cep);

		const city = await this.cityRepository.getByCode(ibgeCode);
		if (!city) {
			throw new NotFoundError('Cidade não encontrada');
		}

		return city.coordinates;
	}
}
