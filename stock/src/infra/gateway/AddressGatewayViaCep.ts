import axios from 'axios';
import type {AddressGateway} from '../../application/gateway/AddressGateway';

type ViaCepSuccessResponse = {
	ibge: string;
};

type ViaCepErrorResponse = {
	erro: boolean;
};
type ViaCepResponse = ViaCepErrorResponse | ViaCepSuccessResponse;

export class AddressGatewayViaCep implements AddressGateway {
	async getIbgeCodeByCep(cep: string): Promise<number> {
		try {
			const response = await axios.get<ViaCepResponse>(`https://viacep.com.br/ws/${cep}/json/`);

			if ('erro' in response.data && response.data.erro) {
				throw new Error('VIA_CEP_ERROR');
			}

			const {ibge} = response.data as ViaCepSuccessResponse;

			return Number(ibge);
		} catch (err: unknown) {
			console.log(err);
			throw new Error('Cep não encontrado');
		}
	}
}
