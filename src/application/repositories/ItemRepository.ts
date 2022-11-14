import type Item from '../../domain/entities/Item';

export type ItemRepository = {
	getById(id: number): Promise<Item | undefined>;
};
