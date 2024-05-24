import express from 'express';
import use_websockets from 'express-ws';
import type { Application } from 'express-ws';
import { webEndpoints } from './webview';

export async function serve() {
    const app = express() as unknown as Application;
    use_websockets(app);
    app.use(express.json());

    app.get('/ping', (_, res) => res.status(200).send('pong'));

    webEndpoints(app);
    console.log('🌟 Starting api server at port', 8888);
    return new Promise<void>((r) => app.listen(8888, '127.0.0.1', r));
}
