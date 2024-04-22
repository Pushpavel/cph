import express from 'express';
import { webEndpoints } from './webview';

export async function serve() {
    const app = express();

    webEndpoints(app);

    return new Promise<void>((r) => app.listen(5677, 'localhost', r));
}
