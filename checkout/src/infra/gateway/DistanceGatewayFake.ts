import type {DistanceGateway} from '../../application/gateway/DistanceGateway';

export class DistanceGatewayFake implements DistanceGateway {
	async getDistanceByCep(originCep: string, destinationCep: string): Promise<number> {
		return 1000;
	}
}
