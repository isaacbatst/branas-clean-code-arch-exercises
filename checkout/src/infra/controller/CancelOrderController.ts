import type {CancelOrder} from '../../application/usecases/CancelOrder';
import type {HttpRequest} from '../http/HttpServer';
import {Controller} from './Controller';

export class CancelOrderController extends Controller {
	constructor(
		private readonly cancelOrder: CancelOrder,
	) {
		super();
	}

	protected handler = async (req: HttpRequest) => {
		const {code} = req.params;

		if (!code || typeof code !== 'string') {
			return {
				statusCode: 400,
			};
		}

		await this.cancelOrder.execute(code);

		return {
			statusCode: 200,
		};
	};
}
