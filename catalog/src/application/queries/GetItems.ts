import {NotFoundError} from '../../domain/errors/NotFoundError';
import prisma from '../../infra/persistence/prisma/prisma';

type Output = {
	description: string;
	price: number;
};

export class GetItems {
	async query(ids: number[]): Promise<Output[]> {
		const items = await prisma.item.findMany({
			where: {
				id: {
					in: ids,
				},
			},
		});

		if (!items) {
			throw new NotFoundError('Item não encontrado');
		}

		return items.map(item => ({
			price: item.price.toNumber(),
			description: item.description,
			addressCep: item.addressCep,
			depth: item.depth.toNumber(),
			width: item.width.toNumber(),
			height: item.height.toNumber(),
			weight: item.weight.toNumber(),
			id: item.id,
		}));
	}
}
