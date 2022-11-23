import type {QueueCallback, QueueGateway} from '../../application/gateway/QueueGateway';

export abstract class QueueController<T> {
	protected abstract handler: QueueCallback<T>;

	public register = async (event: string, queue: string, queueGateway: QueueGateway) => {
		queueGateway.on<T>(event, queue, this.handler)
			.catch(err => {
				console.error('Error registering queue', err);
			});
	};
}
