import 'dotenv/config';
import {App} from './app';

const app = new App();

app.httpServer.listen(Number(process.env.API_PORT));

