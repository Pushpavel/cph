import type { Event, Uri, Webview, WebviewOptions } from 'vscode';
import { unimplementedWowo } from '../helpers';

export class WebviewImpl implements Webview {
    get options(): WebviewOptions {
        return unimplementedWowo();
    }
    get html(): string {
        return unimplementedWowo();
    }
    get onDidReceiveMessage(): Event<any> {
        return unimplementedWowo();
    }
    postMessage(message: any): Thenable<boolean> {
        return unimplementedWowo(message);
    }
    asWebviewUri(localResource: Uri): Uri {
        return unimplementedWowo(localResource);
    }
    get cspSource(): string {
        return unimplementedWowo();
    }
}
