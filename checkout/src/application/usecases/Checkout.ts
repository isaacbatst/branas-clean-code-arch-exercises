import Order from '../../domain/entities/Order';
import {OrderCodeGenerator} from '../../domain/entities/OrderCodeGenerator';
import {OrderStatuses} from '../../domain/entities/OrderStatus';
import {GatewayError} from '../../domain/errors/GatewayError';
import type {ItemGateway} from '../gateway/ItemGateway';
import type {ShippingGateway} from '../gateway/ShippingGateway';
import type {StockGateway} from '../gateway/StockGateway';
import type {CouponRepository} from '../repositories/CouponRepository';
import type {OrderProjectionRepository} from '../repositories/OrderProjectionRepository';
import type {OrderRepository} from '../repositories/OrderRepository';

type Input = {
	cpf: string;
	items: Array<{id: number; quantity: number}>;
	coupon?: string;
	destination: string;
};

type Output = {
	code: string;
	total: number;
};

export class Checkout {
	constructor(
		private readonly orderRepository: OrderRepository,
		private readonly orderProjectionRepository: OrderProjectionRepository,
		private readonly couponRepository: CouponRepository,
		private readonly itemGateway: ItemGateway,
		private readonly shippingGateway: ShippingGateway,
		private readonly stockGateway: StockGateway,
	) {}

	async execute(input: Input): Promise<Output> {
		const count = await this.orderRepository.getCount();
		const orderCode = OrderCodeGenerator.generate(new Date(), count);
		const order = new Order(input.cpf, new Date(), orderCode, input.destination, OrderStatuses.waitingPayment);

		const items = await Promise.all(input.items.map(async ({id, quantity}) => {
			const item = await this.itemGateway.getById(id);
			return {
				item,
				quantity,
			};
		}));

		const shippings = await this.shippingGateway.calculateShipping({
			destination: input.destination,
			orderItems: items,
		});

		items.forEach(({item, quantity}) => {
			const shippingItem = shippings.find(shippingItem => shippingItem.id === item.idItem);
			if (!shippingItem) {
				throw new GatewayError('Frete de item não calculado');
			}

			order.addItem({
				idItem: item.idItem,
				price: item.price,
				quantity,
				shipping: shippingItem.shipping,
			});
		});

		if (input.coupon) {
			const coupon = await this.couponRepository.getByCode(input.coupon);
			order.addCoupon(coupon);
		}

		await this.orderRepository.save(order);
		await this.orderProjectionRepository.save(order, items.map(({item}) => item));
		await Promise.all(
			items.map(async ({item, quantity}) => this.stockGateway.decrement(item.idItem, quantity)),
		);

		return {
			code: order.code,
			total: order.getTotal(),
		};
	}
}
