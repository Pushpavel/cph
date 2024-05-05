import { static as static_files } from 'express';
import { Application } from 'express-ws';
import { registeredWebviewViewProviders } from './register';
import { WebviewViewImpl } from './impl/WebviewViewImpl';
import { WebviewView } from 'vscode';
import { WebviewImpl } from './impl/WebviewImpl';
import path from 'path';
import { context } from '../..';
import { randomUUID } from 'crypto';

export function endpoints(app: Application) {
    const webviewViews: Record<string, WebviewView> = {};

    app.use(
        context.extensionUri.path,
        static_files(path.join(__dirname, '..', '..', '..')),
    );

    app.get('/webview/:viewtype', async (req, res) => {
        const viewtype = req.params['viewtype'];
        const viewid = randomUUID();
        const webviewViewProvider = registeredWebviewViewProviders[viewtype];
        if (!webviewViewProvider) {
            return res.sendStatus(404);
        }
        const webviewView = new WebviewViewImpl('webview', new WebviewImpl());
        await webviewViewProvider.resolveWebviewView(
            webviewView,
            {} as any, // #hack
            {} as any, // #hack
        );
        webviewView.webview.html = webviewView.webview.html.replace(
            '<body>',
            `<body>
                <script>window.viewid = '${viewid}'</script>
                <script src="/static/dist/vscodefrontend.js"></script>
            `,
        );
        webviewViews[viewid] = webviewView;
        res.send(webviewView.webview.html);
    });

    app.ws('/webview/:viewtype/:viewid/messages', async (ws, req) => {
        const viewid = req.params['viewid'];
        const webview = webviewViews[viewid].webview as WebviewImpl;
        console.log('🌍==⚡==🌟');
        webview.connectWebSocket(ws);
        ws.on('close', () => {
            // TODO: dispose webviewView properly
            delete webviewViews[viewid];
            console.log('🌍==❌==🌟');
        });
    });
}
