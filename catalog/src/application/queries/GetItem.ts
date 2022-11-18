import {NotFoundError} from '../../domain/errors/NotFoundError';
import prisma from '../../infra/persistence/prisma/prisma';

type Output = {
	description: string;
	price: number;
};

export class GetItem {
	async query(id: number): Promise<Output> {
		const item = await prisma.item.findUnique({
			where: {
				id,
			},
		});

		if (!item) {
			throw new NotFoundError('Item não encontrado');
		}

		return {
			price: item.price.toNumber(),
			description: item.description,
		};
	}
}
