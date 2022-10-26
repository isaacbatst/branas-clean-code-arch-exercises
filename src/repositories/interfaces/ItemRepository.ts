import type Item from '../../entities/Item';

export type ItemRepository = {
	getById(id: number): Promise<Item | undefined>;
};
