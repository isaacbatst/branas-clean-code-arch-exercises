import Coupon from "./Coupon";
import Cpf from "./Cpf";
import Item, { Dimensions } from "./Item";
import OrderItem from "./OrderItem";
import Shipping from "./Shipping";

export default class Order {
	cpf: Cpf;
	orderItems: OrderItem[];
	coupon?: Coupon;
	private shipping: Shipping;

	constructor (cpf: string) {
		this.cpf = new Cpf(cpf);
		this.orderItems = [];
		this.shipping = new Shipping();
	}
	
	addItem (item: Item, quantity: number) {
		const isSomeEqual = this.orderItems.some(orderItem => orderItem.idItem === item.idItem);

		if(isSomeEqual) throw new Error('Item duplicado');

		this.orderItems.push(new OrderItem(item.idItem, item.price, quantity));
		this.shipping.incrementValue(item.dimensions, item.weight);
	}

	addCoupon (coupon: Coupon) {
		const now = new Date();
		if(coupon.expirationDate.getTime() < now.getTime()) {
			throw new Error('Cupom expirado')
		} 

		this.coupon = coupon;
	}

	getTotal () {
		let total = this.orderItems.reduce((total, orderItem) => {
			total += orderItem.getTotal();
			return total;
		}, 0);
		if (this.coupon) {
			total -= this.coupon.calculateDiscount(total);
		}
		return total;
	}

	getShipping () {
		return this.shipping.getValue();
	}
}
