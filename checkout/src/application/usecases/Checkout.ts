import Order from '../../domain/entities/Order';
import {OrderStatuses} from '../../domain/entities/OrderStatus';
import {AppError} from '../../domain/errors/AppError';
import {GatewayError} from '../../domain/errors/GatewayError';
import {OrderProcessed} from '../../domain/events/OrderProcessed';
import {OrderProcessingFailed} from '../../domain/events/OrderProcessingFailed';
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
	orderCode: string;
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

	async execute(input: Input): Promise<void> {
		try {
			const order = new Order(input.cpf, new Date(), input.orderCode, input.destination, OrderStatuses.waitingPayment);
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
			await this.queueGateway.publish(new OrderProcessed({
				code: order.code,
				orderItems: order.orderItems,
			}));
		} catch (err: unknown) {
			const cause = err instanceof AppError && !(err instanceof GatewayError)
				? err.message
				: 'Sistema indisponível';

			await this.queueGateway.publish(new OrderProcessingFailed({
				code: input.orderCode,
				cause,
			}));
		}
	}
}
