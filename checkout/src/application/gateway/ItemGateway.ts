import type Item from '../../domain/entities/Item';

export type ItemGateway = {
	getById(id: number): Promise<Item>;
};
