import { Event, ViewBadge, Webview, WebviewView } from 'vscode';
import { unimplementedWowo } from '../../../helpers';
import { EventEmitterImpl } from '../../../impl/EventEmitterImpl';

export class WebviewViewImpl implements WebviewView {
    private _visible: boolean = false;
    onDidChangeVisibilityEmitter = new EventEmitterImpl<void>();

    title?: string;
    description?: string;
    badge?: ViewBadge;

    constructor(
        readonly viewType: string,
        readonly webview: Webview,
    ) {}

    get visible(): boolean {
        return this._visible;
    }
    set visible(value: boolean) {
        this._visible = value;
        this.onDidChangeVisibilityEmitter.fire();
    }

    get onDidDispose(): Event<void> {
        return unimplementedWowo();
    }
    get onDidChangeVisibility(): Event<void> {
        return this.onDidChangeVisibilityEmitter.event;
    }

    show(preserveFocus?: boolean): void {
        unimplementedWowo(preserveFocus);
    }
}
