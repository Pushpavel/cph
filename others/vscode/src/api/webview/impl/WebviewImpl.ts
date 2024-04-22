import type { Event, Uri, Webview, WebviewOptions } from 'vscode';
import { unimplementedWowo } from '../../../helpers';
import { EventEmitterImpl } from '../../../impl/EventEmitterImpl';

export class WebviewImpl implements Webview {
    options: WebviewOptions = {};
    html: string = 'Not initialized';
    private onDidReceiveMessageEmitter = new EventEmitterImpl<any>();
    get onDidReceiveMessage(): Event<any> {
        return this.onDidReceiveMessageEmitter.event;
    }
    postMessage(message: any): Thenable<boolean> {
        return unimplementedWowo(message);
    }
    asWebviewUri(localResource: Uri): Uri {
        // #hack
        return localResource;
    }
    get cspSource(): string {
        return unimplementedWowo();
    }
}
