import Item from '../../../domain/entities/Item';
import prisma from './prisma';
import type {ItemRepository} from '../../../domain/repositories/ItemRepository';

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
				weight: item.weight.toNumber(),
			});
		}
	}
}
