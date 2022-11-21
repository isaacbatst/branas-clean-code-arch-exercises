export type ItemDto = {
	idItem: number;
	description: string;
	price: number;
	dimensions: {
		width: number;
		height: number;
		depth: number;
	};
	weight: number;
	addressCep: string;
};

export type ItemGateway = {
	getById(id: number): Promise<ItemDto>;
	getItems(ids: number[]): Promise<ItemDto[]>;
};
