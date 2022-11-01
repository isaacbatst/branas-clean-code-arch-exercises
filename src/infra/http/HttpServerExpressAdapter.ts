import type {Request, RequestHandler} from 'express';
import express from 'express';
import type {HttpMethod, HttpRequest, HttpResponse, HttpServer} from './HttpServer';

export class HttpServerExpressAdapter implements HttpServer {
	app = express();

	appMethods: Record<HttpMethod, (path: string, callback: RequestHandler) => void> = {
		post: (path: string, callback: RequestHandler) => {
			this.app.post(path, callback);
		},
		delete: (path: string, callback: RequestHandler) => {
			this.app.delete(path, callback);
		},
		get: (path: string, callback: RequestHandler) => {
			this.app.get(path, callback);
		},
		put: (path: string, callback: RequestHandler) => {
			this.app.put(path, callback);
		},
	};

	constructor() {
		this.app.use(express.json());
	}

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

	listen(port: number): void {
		this.app.listen(port, () => {
			console.log('express listening');
		});
	}
}