export type HttpRequest = {
	body: Record<string, unknown>;
	params: Record<string, unknown>;
};

export type HttpResponse = {
	statusCode: number;
	body?: Record<string, unknown>;
};

export type HttpMethod = 'get' | 'post' | 'put' | 'delete';

export type HttpServer = {
	on(method: HttpMethod, route: string, callback: (req: HttpRequest) => Promise<HttpResponse>): void;
	listen(port: number): void;
};
