import { Application, static as static_files } from 'express';
import { registeredWebviewViewProviders } from './register';
import { WebviewViewImpl } from './impl/WebviewViewImpl';
import { WebviewView } from 'vscode';
import { WebviewImpl } from './impl/WebviewImpl';
import path from 'path';
import { context } from '../..';

export function endpoints(app: Application) {
    const webviewViews: Record<string, WebviewView> = {};

    app.use(
        context.extensionUri,
        static_files(path.join(__dirname, '..', '..', '..')),
    );

    app.get('/webview/:viewid', async (req, res) => {
        const viewid = req.params['viewid'];
        let webviewView = webviewViews[viewid];

        if (!webviewView) {
            const webviewViewProvider = registeredWebviewViewProviders[viewid];
            if (!webviewViewProvider) {
                return res.sendStatus(404);
            }
            webviewView = new WebviewViewImpl('webview', new WebviewImpl());
            await webviewViewProvider.resolveWebviewView(
                webviewView,
                {} as any, // #hack
                {} as any, // #hack
            );
            webviewView.webview.html = webviewView.webview.html.replace(
                '<body>',
                `<body><script src="/static/dist/vscodefrontend.js"></script>`,
            );
            webviewViews[viewid] = webviewView;
        }
        res.send(webviewView.webview.html);
    });

    app.post('/webview/:viewid/post-message-to-vscode', async (req, res) => {
        const viewid = req.params['viewid'];
        const webview = webviewViews[viewid].webview as WebviewImpl;
        console.log(`🌍->🌟`, req.body);
        webview.onDidReceiveMessageEmitter.fire(req.body);
        res.sendStatus(200);
    });
}
