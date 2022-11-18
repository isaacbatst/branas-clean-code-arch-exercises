export type HttpRequest = {
	body: Record<string, unknown>;
	params: Record<string, unknown>;
};

export type HttpResponse = {
	statusCode: number;
	body?: Record<string, unknown>;
};

export type HttpMethod = 'get' | 'post' | 'put' | 'delete';
export type HttpRequestHandler = (req: HttpRequest) => Promise<HttpResponse>;

export type HttpServer = {
	on(method: HttpMethod, route: string, callback: HttpRequestHandler): void;
	listen(port: number): void;
	useErrorMiddleware(callback: (err: unknown) => HttpResponse): void;
};
