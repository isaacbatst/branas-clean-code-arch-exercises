import type {QueueGateway} from '../../application/gateway/QueueGateway';
import type {Checkout, Input as CheckoutInput} from '../../application/usecases/Checkout';

export class CheckoutController {
	constructor(
		private readonly checkout: Checkout,
	) {
	}

	public register = async (event: string, queue: string, queueGateway: QueueGateway) => {
		await queueGateway
			.on<CheckoutInput>(event, queue, async payload => {
			await this.checkout.execute(payload);
		});
	};
}
