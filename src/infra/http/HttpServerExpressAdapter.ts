import type {HttpMethod, HttpRequest, HttpResponse, HttpServer} from './HttpServer';
import type {IRouterMatcher, Request, Express} from 'express';
import express from 'express';

export class HttpServerExpressAdapter implements HttpServer {
	app = express();

	appMethods: Record<HttpMethod, IRouterMatcher<Express>> = {
		post: this.app.post,
		delete: this.app.delete,
		get: this.app.get,
		put: this.app.put,
	};

	on(method: HttpMethod, route: string, callback: (req: HttpRequest) => Promise<HttpResponse>): void {
		this.appMethods[method](route, async (
			req: Request<Record<string, unknown>, Record<string, unknown>, Record<string, unknown>>,
			res,
		) => {
			const {body, statusCode} = await callback({
				body: req.body,
				params: req.params,
			});

			if (!body) {
				return res.status(statusCode).end();
			}

			return res.status(statusCode).json(body);
		});
	}
}
