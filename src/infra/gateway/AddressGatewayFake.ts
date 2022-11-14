import {NotFoundError} from '@prisma/client/runtime';
import type {AddressGateway} from '../../application/gateway/AddressGateway';

type Address = {
	cep: string; ibgeCode: number;
};

export class AddressGatewayFake implements AddressGateway {
	private readonly addresses: Address[] = [
		{cep: '71692-404', ibgeCode: 5300108},
		{cep: '29296-982', ibgeCode: 3205036},
		{cep: '59700-970', ibgeCode: 2401008},
	];

	addAddress(address: Address) {
		this.addresses.push(address);
	}

	async getIbgeCodeByCep(cep: string): Promise<number> {
		const address = this.addresses.find(address => address.cep === cep);
		if (!address) {
			throw new NotFoundError('Endereço não encontrado');
		}

		return address.ibgeCode;
	}
}
