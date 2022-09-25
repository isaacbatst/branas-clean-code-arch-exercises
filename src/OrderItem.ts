export default class OrderItem {

	constructor (readonly idItem: number, readonly price: number, readonly quantity: number) {
		if(quantity < 0) throw new Error('Quantidade não pode ser negativa');
	}

	getTotal () {
		return this.price * this.quantity;
	}
}