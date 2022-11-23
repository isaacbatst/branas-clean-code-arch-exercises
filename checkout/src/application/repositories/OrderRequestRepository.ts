import type {OrderRequest} from '../../domain/entities/OrderRequest';

export type OrderRequestRepository = {
	getLastInsertedOnYear(year: number): Promise<OrderRequest | undefined>;
	save(requestedOrder: OrderRequest): Promise<void>;
};
