import {
    WebviewViewProvider,
    Disposable,
    StatusBarAlignment,
    StatusBarItem,
    TextEditor,
    Event,
    TextDocument,
    ViewColumn,
    OutputChannel,
} from 'vscode';
import { disposableWowo, unimplementedWowo, unusedWowo } from './helpers';
import { OutputChannelImpl } from './impl/OutputChannelImpl';
import { StatusBarItemImpl } from './impl/StatusBarItemImpl';
import { EventEmitterImpl } from './impl/EventEmitterImpl';

// #hack
export const activeTextEditor = undefined;

export function showErrorMessage(msg: string) {
    console.error('vscode: ErrorMsg:', msg);
}

export function showInfoMessage(msg: string) {
    console.error('vscode: InfoMsg:', msg);
}

export async function showQuickPick(items: string[]) {
    // #hack
    return items[0];
}

export function registerWebviewViewProvider(
    viewId: string,
    provider: WebviewViewProvider,
    options?: {
        readonly webviewOptions?: {
            readonly retainContextWhenHidden?: boolean;
        };
    },
): Disposable {
    console.log(`🌟 WEBVIEW_VIEW_PROVIDER(${viewId}): registering with `, {
        provider,
        options,
    });
    return disposableWowo(`registeredWebviewViewProvider:`, {
        viewId,
        provider,
        options,
    });
}

export function createStatusBarItem(
    alignment?: StatusBarAlignment,
    priority?: number,
): StatusBarItem {
    const StatusBarItem = new StatusBarItemImpl(alignment);
    StatusBarItem.priority = priority;
    return StatusBarItem;
}

// #hack
const _onDidChangeActiveTextEditorEmitter = new EventEmitterImpl<
    TextEditor | undefined
>();

// #hack
const _onDidChangeVisibleTextEditorsEmitter = new EventEmitterImpl<
    readonly TextEditor[]
>();

export const onDidChangeActiveTextEditor: Event<TextEditor | undefined> =
    _onDidChangeActiveTextEditorEmitter.event;

export const onDidChangeVisibleTextEditors: Event<readonly TextEditor[]> =
    _onDidChangeVisibleTextEditorsEmitter.event;

export function showTextDocument(
    document: TextDocument,
    column?: ViewColumn,
    preserveFocus?: boolean,
): Thenable<TextEditor> {
    return unimplementedWowo(document, column, preserveFocus);
}

export function createOutputChannel(
    name: string,
    languageId?: string,
): OutputChannel {
    unusedWowo({ languageId });
    return new OutputChannelImpl(name);
}
