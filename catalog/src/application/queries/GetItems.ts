import {NotFoundError} from '../../domain/errors/NotFoundError';
import prisma from '../../infra/persistence/prisma/prisma';

type Output = {
	description: string;
	price: number;
};

export class GetItems {
	async query(): Promise<Output[]> {
		const items = await prisma.item.findMany();

		if (!items) {
			throw new NotFoundError('Item não encontrado');
		}

		return items.map(item => ({
			price: item.price.toNumber(),
			description: item.description,
		}));
	}
}
