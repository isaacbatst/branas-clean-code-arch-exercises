import {OrderFinance} from '../../domain/entities/OrderFinance';
import {GatewayError} from '../../domain/errors/GatewayError';
import type {GatewayFactory} from '../gateway/GatewayFactory';
import type {ItemGateway} from '../gateway/ItemGateway';
import type {ShippingGateway} from '../gateway/ShippingGateway';
import type {CouponRepository} from '../repositories/CouponRepository';
import type {RepositoryFactory} from '../repositories/RepositoryFactory';

type Input = {
	items: Array<{id: number; quantity: number}>;
	coupon?: string;
	destination: string;
};

type Output = {
	total: number;
};

export class Preview {
	private readonly itemGateway: ItemGateway;
	private readonly shippingGateway: ShippingGateway;
	private readonly couponRepository: CouponRepository;
	constructor(
		repositoryFactory: RepositoryFactory,
		gatewayFactory: GatewayFactory,
	) {
		this.couponRepository = repositoryFactory.couponRepository;
		this.itemGateway = gatewayFactory.itemGateway;
		this.shippingGateway = gatewayFactory.shippingGateway;
	}

	async execute(input: Input): Promise<Output> {
		const orderFinance = new OrderFinance();

		const items = await Promise.all(input.items.map(async ({id, quantity}) => ({
			item: await this.itemGateway.getById(id),
			quantity,
		})));

		const shippings = await this.shippingGateway.calculateShipping({
			destination: input.destination,
			orderItems: items,
		});

		items.forEach(({item, quantity}) => {
			const shippingItem = shippings.find(({id}) => id === item.idItem);

			if (!shippingItem) {
				throw new GatewayError('Frete de item não calculado');
			}

			orderFinance.addItem({
				idItem: item.idItem,
				price: item.price,
				quantity,
				shipping: shippingItem.shipping,
			});
		});

		if (input.coupon) {
			const coupon = await this.couponRepository.getByCode(input.coupon);
			orderFinance.addCoupon(coupon, new Date());
		}

		return {
			total: orderFinance.getTotal(),
		};
	}
}
