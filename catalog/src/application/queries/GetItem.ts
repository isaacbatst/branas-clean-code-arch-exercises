import {NotFoundError} from '../../domain/errors/NotFoundError';
import prisma from '../../infra/persistence/prisma/prisma';

type Output = {
	id: number;
	description: string;
	price: number;
	weight: number;
	height: number;
	width: number;
	depth: number;
	addressCep: string;
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
			addressCep: item.addressCep,
			depth: item.depth.toNumber(),
			width: item.width.toNumber(),
			height: item.height.toNumber(),
			weight: item.weight.toNumber(),
			id: item.id,
		};
	}
}
