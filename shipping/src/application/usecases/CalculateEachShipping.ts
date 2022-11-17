import {NotFoundError} from '@prisma/client/runtime';
import type {Coordinates} from '../../domain/entities/Coordinates';
import {DistanceCalculator} from '../../domain/entities/DistanceCalculator';
import ShippingCalculator from '../../domain/entities/ShippingCalculator';
import type {AddressGateway} from '../gateway/AddressGateway';
import type {CityRepository} from '../repositories/CityRepository';

type Input = {
	destination: string;
	orderItems: Array<{
		id: number;
		dimensions: {
			depth: number;
			height: number;
			width: number;
		};
		origin: string;
		weight: number;
		quantity: number;
	}>;
};

export class CalculateEachShipping {
	constructor(
		private readonly addressGateway: AddressGateway,
		private readonly cityRepository: CityRepository,
	) {}

	async execute(input: Input): Promise<Array<{id: number; shipping: number}>> {
		const destinationCoordinantes = await this.getCoordinatesByCep(input.destination);

		const itemWithShipping = await Promise.all(input.orderItems.map(async orderItem => {
			const originCoordinates = await this.getCoordinatesByCep(orderItem.origin);
			const distance = DistanceCalculator.calculate(originCoordinates, destinationCoordinantes);
			const itemShipping = ShippingCalculator.calculate(orderItem, distance) * orderItem.quantity;

			return {
				id: orderItem.id,
				shipping: itemShipping,
			};
		}));

		return itemWithShipping;
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
