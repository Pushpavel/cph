import express from 'express';
import use_websockets from 'express-ws';
import type { Application } from 'express-ws';
import { webEndpoints } from './webview';

export async function serve() {
    const app = express() as unknown as Application;
    use_websockets(app);
    app.use(express.json());

    webEndpoints(app);
    console.log('🌟 Starting api server at port', 5677);
    return new Promise<void>((r) => app.listen(5677, 'localhost', r));
}
