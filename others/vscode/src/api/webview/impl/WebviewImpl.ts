import type { Event, Uri, Webview, WebviewOptions } from 'vscode';
import { unimplementedWowo } from '../../../helpers';
import { EventEmitterImpl } from '../../../impl/EventEmitterImpl';
import ws from 'ws';

export class WebviewImpl implements Webview {
    private webSocket?: ws;
    private onDidReceiveMessageEmitter = new EventEmitterImpl<any>();

    options: WebviewOptions = {};
    html: string = 'Not initialized';

    get onDidReceiveMessage(): Event<any> {
        return this.onDidReceiveMessageEmitter.event;
    }
    postMessage(message: any): Thenable<boolean> {
        if (!this.webSocket) {
            unimplementedWowo(
                `Did not expect postMessage to be called before websocket is initialized`,
            );
        }
        console.log(`🌟->🌍`, message);
        return new Promise(
            (r) =>
                this.webSocket?.send(JSON.stringify(message), (err) =>
                    r(err != null),
                ),
        );
    }
    asWebviewUri(localResource: Uri): Uri {
        // #hack
        return localResource;
    }
    get cspSource(): string {
        return unimplementedWowo();
    }

    connectWebSocket(webSocket: ws) {
        this.webSocket = webSocket;
        webSocket.on('message', (data: string) => {
            data = JSON.parse(data);
            console.log(`🌍->🌟`, data);
            this.onDidReceiveMessageEmitter.fire(data);
        });
    }
}
