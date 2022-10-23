import type Coupon from './Coupon';
import Cpf from './Cpf';
import type Item from './Item';
import {OrderCodeGenerator} from './OrderCodeGenerator';
import OrderItem from './OrderItem';
import Shipping from './Shipping';

export default class Order {
	readonly cpf: Cpf;
	readonly orderItems: OrderItem[];
	readonly code: string;
	readonly date: Date;
	private coupon?: Coupon;
	private readonly shipping: Shipping;

	constructor(cpf: string, date: Date, ordersCount: number) {
		this.cpf = new Cpf(cpf);
		this.orderItems = [];
		this.shipping = new Shipping();
		this.date = date;
		this.code = OrderCodeGenerator.generate(date, ordersCount);
	}

	addItem(item: Item, quantity: number) {
		const isSomeEqual = this.orderItems.some(orderItem => orderItem.idItem === item.idItem);

		if (isSomeEqual) {
			throw new Error('Item duplicado');
		}

		this.orderItems.push(new OrderItem(item.idItem, item.price, quantity));
		this.shipping.incrementValue(item.dimensions, item.weight);
	}

	addCoupon(coupon: Coupon) {
		if (coupon.expirationDate.getTime() < this.date.getTime()) {
			throw new Error('Cupom expirado');
		}

		this.coupon = coupon;
	}

	getTotal() {
		let total = this.orderItems
			.reduce((total, orderItem) => total + orderItem.getTotal(), 0);

		total += this.shipping.getValue();

		if (this.coupon) {
			total -= this.coupon.calculateDiscount(total);
		}

		return total;
	}

	getShipping() {
		return this.shipping.getValue();
	}
}
