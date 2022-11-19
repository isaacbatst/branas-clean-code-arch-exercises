import {ConflictError} from '../errors/ConflictError';
import type Coupon from './Coupon';
import {CouponValidator} from './CouponValidator';
import Cpf from './Cpf';
import type Item from './Item';
import OrderItem from './OrderItem';
import {OrderStatus, OrderStatuses} from './OrderStatus';

export default class Order {
	readonly cpf: Cpf;
	readonly orderItems: OrderItem[];
	readonly code: string;
	readonly date: Date;
	readonly destination: string;
	private status: OrderStatus;
	private coupon?: Coupon;

	constructor(cpf: string, date: Date, code: string, destination: string, status: string) {
		this.cpf = new Cpf(cpf);
		this.status = new OrderStatus(status);
		this.orderItems = [];
		this.date = date;
		this.destination = destination;
		this.code = code;
	}

	addItem(item: Item, quantity: number, shipping: number) {
		const isSomeEqual = this.orderItems.some(orderItem => orderItem.idItem === item.idItem);

		if (isSomeEqual) {
			throw new Error('Item duplicado');
		}

		this.orderItems.push(new OrderItem(item.idItem, item.price, quantity, shipping));
	}

	addCoupon(coupon: Coupon) {
		if (!CouponValidator.validate(coupon, this.date)) {
			throw new Error('Cupom expirado');
		}

		this.coupon = coupon;
	}

	getTotal() {
		let total = this.orderItems
			.reduce((total, orderItem) => {
				total += orderItem.getTotal();
				return Number(total.toFixed(2));
			}, 0);

		if (this.coupon) {
			total -= this.coupon.calculateDiscount(total);
		}

		return total;
	}

	getCoupon() {
		return this.coupon;
	}

	getStatus() {
		return this.status.value;
	}

	cancel() {
		if (this.status.value === OrderStatuses.canceled) {
			throw new ConflictError('Pedido já cancelado');
		}

		this.status = new OrderStatus(OrderStatuses.canceled);
	}
}
