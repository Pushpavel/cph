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
import { unimplementedWowo, unusedWowo } from './helpers';
import { OutputChannelImpl } from './impl/OutputChannelImpl';

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
    return unimplementedWowo<Disposable>(viewId, provider, options);
}

export function createStatusBarItem(
    alignment?: StatusBarAlignment,
    priority?: number,
): StatusBarItem {
    return unimplementedWowo(alignment, priority);
}

export const onDidChangeActiveTextEditor: Event<TextEditor | undefined> =
    function <T>(
        listener: (e: T) => any,
        thisArgs?: any,
        disposables?: Disposable[],
    ): Disposable {
        return unimplementedWowo(listener, thisArgs, disposables);
    };

export const onDidChangeVisibleTextEditors: Event<readonly TextEditor[]> =
    function <T>(
        listener: (e: T) => any,
        thisArgs?: any,
        disposables?: Disposable[],
    ): Disposable {
        return unimplementedWowo(listener, thisArgs, disposables);
    };

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
