import {ConflictError} from '../errors/ConflictError';
import type Coupon from './Coupon';
import Cpf from './Cpf';
import {OrderFinance} from './OrderFinance';
import {OrderStatus, OrderStatuses} from './OrderStatus';

export default class Order {
	readonly cpf: Cpf;

	readonly code: string;
	readonly date: Date;
	readonly destination: string;
	private status: OrderStatus;
	private readonly orderFinance: OrderFinance;

	constructor(cpf: string, date: Date, code: string, destination: string, status: string) {
		this.cpf = new Cpf(cpf);
		this.status = new OrderStatus(status);
		this.orderFinance = new OrderFinance();
		this.date = date;
		this.destination = destination;
		this.code = code;
	}

	addItem(item: {idItem: number; price: number; quantity: number; shipping: number}) {
		this.orderFinance.addItem(item);
	}

	addCoupon(coupon: Coupon) {
		this.orderFinance.addCoupon(coupon, this.date);
	}

	getTotal() {
		return this.orderFinance.getTotal();
	}

	getCoupon() {
		return this.orderFinance.getCoupon();
	}

	get orderItems() {
		return this.orderFinance.orderItems;
	}

	getStatus() {
		return this.status.value;
	}

	cancel() {
		if (this.status.value === OrderStatuses.canceled) {
			throw new ConflictError('Pedido já cancelado');
		}

		if (this.status.value === OrderStatuses.shipped) {
			throw new ConflictError('Pedido já enviado');
		}

		this.status = new OrderStatus(OrderStatuses.canceled);
	}
}
