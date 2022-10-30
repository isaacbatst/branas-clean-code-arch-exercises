import Item from '../../entities/Item';
import prisma from '../../infra/prisma';
import type {ItemRepository} from '../interfaces/ItemRepository';

export class ItemRepositoryPrisma implements ItemRepository {
	async getById(id: number): Promise<Item | undefined> {
		const item = await prisma.item.findUnique({where: {id}});

		if (item) {
			return new Item({
				...item,
				depth: item.depth.toNumber(),
				height: item.height.toNumber(),
				width: item.width.toNumber(),
				price: item.price.toNumber(),
				weight: item.price.toNumber(),
			});
		}
	}
}
