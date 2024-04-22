import { Event, ViewBadge, Webview, WebviewView } from 'vscode';
import { unimplementedWowo } from '../../../helpers';

export class WebviewViewImpl implements WebviewView {
    constructor(
        readonly viewType: string,
        readonly webview: Webview,
    ) {}
    title?: string;
    description?: string;
    badge?: ViewBadge;
    get onDidDispose(): Event<void> {
        return unimplementedWowo();
    }
    get visible(): boolean {
        return unimplementedWowo();
    }
    get onDidChangeVisibility(): Event<void> {
        return unimplementedWowo();
    }
    show(preserveFocus?: boolean): void {
        unimplementedWowo(preserveFocus);
    }
}
