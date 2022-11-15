import type {HttpMethod, HttpRequestHandler, HttpServer} from '../http/HttpServer';

export abstract class Controller {
	protected abstract handler: HttpRequestHandler;

	public register(
		method: HttpMethod,
		path: string,
		httpServer: HttpServer,
	) {
		httpServer.on(method, path, this.handler);
	}
}
