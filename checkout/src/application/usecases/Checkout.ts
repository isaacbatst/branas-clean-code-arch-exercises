import Order from '../../domain/entities/Order';
import {OrderCodeGenerator} from '../../domain/entities/OrderCodeGenerator';
import {OrderStatuses} from '../../domain/entities/OrderStatus';
import {GatewayError} from '../../domain/errors/GatewayError';
import {OrderPlaced} from '../../domain/events/OrderPlaced';
import type {GatewayFactory} from '../gateway/GatewayFactory';
import type {ItemGateway} from '../gateway/ItemGateway';
import type {QueueGateway} from '../gateway/QueueGateway';
import type {ShippingGateway} from '../gateway/ShippingGateway';
import type {CouponRepository} from '../repositories/CouponRepository';
import type {OrderRepository} from '../repositories/OrderRepository';
import type {RepositoryFactory} from '../repositories/RepositoryFactory';

type Input = {
	cpf: string;
	items: Array<{id: number; quantity: number}>;
	coupon?: string;
	destination: string;
	count: number;
};

type Output = {
	code: string;
	total: number;
};

export class Checkout {
	private readonly orderRepository: OrderRepository;
	private readonly couponRepository: CouponRepository;
	private readonly itemGateway: ItemGateway;
	private readonly shippingGateway: ShippingGateway;
	private readonly queueGateway: QueueGateway;
	constructor(
		repositoryFactory: RepositoryFactory,
		gatewayFactory: GatewayFactory,
	) {
		this.couponRepository = repositoryFactory.couponRepository;
		this.orderRepository = repositoryFactory.orderRepository;
		this.itemGateway = gatewayFactory.itemGateway;
		this.shippingGateway = gatewayFactory.shippingGateway;
		this.queueGateway = gatewayFactory.queueGateway;
	}

	async execute(input: Input): Promise<Output> {
		const orderCode = OrderCodeGenerator.generate(new Date(), input.count);
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
		await this.queueGateway.publish(new OrderPlaced({
			code: order.code,
			orderItems: order.orderItems,
		}));

		return {
			code: order.code,
			total: order.getTotal(),
		};
	}
}
