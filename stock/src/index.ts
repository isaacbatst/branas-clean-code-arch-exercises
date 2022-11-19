import {App} from './app';

if (!process.env.API_PORT) {
	throw new Error('API port missing');
}

const app = new App();

app.httpServer.listen(Number(process.env.API_PORT));

