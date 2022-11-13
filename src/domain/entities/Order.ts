import type Coupon from './Coupon';
import {CouponValidator} from './CouponValidator';
import Cpf from './Cpf';
import type Item from './Item';
import {OrderCodeGenerator} from './OrderCodeGenerator';
import OrderItem from './OrderItem';
import ShippingCalculator from './ShippingCalculator';

export default class Order {
	readonly cpf: Cpf;
	readonly orderItems: OrderItem[];
	readonly code: string;
	readonly date: Date;
	private coupon?: Coupon;
	private shipping: number;

	constructor(cpf: string, date: Date, ordersCount: number) {
		this.cpf = new Cpf(cpf);
		this.orderItems = [];
		this.shipping = 0;
		this.date = date;
		this.code = OrderCodeGenerator.generate(date, ordersCount);
	}

	addItem(item: Item, quantity: number) {
		const isSomeEqual = this.orderItems.some(orderItem => orderItem.idItem === item.idItem);

		if (isSomeEqual) {
			throw new Error('Item duplicado');
		}

		this.orderItems.push(new OrderItem(item.idItem, item.price, quantity));
		this.shipping += ShippingCalculator.calculate(item) * quantity;
	}

	addCoupon(coupon: Coupon) {
		if (!CouponValidator.validate(coupon, this.date)) {
			throw new Error('Cupom expirado');
		}

		this.coupon = coupon;
	}

	getTotal() {
		let total = this.orderItems
			.reduce((total, orderItem) => total + orderItem.getTotal(), 0);

		total += this.shipping;

		if (this.coupon) {
			total -= this.coupon.calculateDiscount(total);
		}

		return total;
	}

	getCoupon() {
		return this.coupon;
	}
}
