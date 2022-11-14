export type DistanceGateway = {
	getDistanceByCep(originCep: string, destinationCep: string): Promise<number>;
};
