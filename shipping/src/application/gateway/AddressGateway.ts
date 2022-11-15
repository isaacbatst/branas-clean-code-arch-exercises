export type AddressGateway = {
	getIbgeCodeByCep(cep: string): Promise<number>;
};
