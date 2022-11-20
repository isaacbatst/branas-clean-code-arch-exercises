import type Coupon from './Coupon';
import {CouponValidator} from './CouponValidator';
import OrderItem from './OrderItem';

export class OrderFinance {
	readonly orderItems: OrderItem[] = [];
	private coupon?: Coupon;

	addItem(item: {idItem: number; price: number; quantity: number; shipping: number}) {
		const isSomeEqual = this.orderItems.some(orderItem => orderItem.idItem === item.idItem);

		if (isSomeEqual) {
			throw new Error('Item duplicado');
		}

		this.orderItems.push(new OrderItem(item.idItem, item.price, item.quantity, item.shipping));
	}

	addCoupon(coupon: Coupon, date: Date) {
		if (!CouponValidator.validate(coupon, date)) {
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
}
