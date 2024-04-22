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
        }
        res.send(webviewView.webview.html);
    });
}
