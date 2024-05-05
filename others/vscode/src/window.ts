import type {
    StatusBarAlignment,
    StatusBarItem,
    TextEditor,
    Event,
    TextDocument,
    ViewColumn,
    OutputChannel,
} from 'vscode';
import { unusedWowo } from './helpers';
import { OutputChannelImpl } from './impl/OutputChannelImpl';
import { StatusBarItemImpl } from './impl/StatusBarItemImpl';
import { EventEmitterImpl } from './impl/EventEmitterImpl';
import { TextEditorImpl } from './impl/TextEditorImpl';
import { ideClient } from './api/ide';

export { registerWebviewViewProvider } from './api/webview';

// #hack
export const activeTextEditor = undefined;

export function showErrorMessage(msg: string) {
    console.error('🌟 ERROR_MESSAGE:', msg);
}

export function showInfoMessage(msg: string) {
    console.info('🌟 INFO_MESSAGE:', msg);
}

export async function showQuickPick(items: string[]) {
    // #hack
    console.log('🌟 QUICK_PICK: showing', items, `Choosing ${items[0]}`);
    return items[0];
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
const _onDidChangeVisibleTextEditorsEmitter = new EventEmitterImpl<
    readonly TextEditor[]
>();

export const onDidChangeActiveTextEditor =
    ideClient.onDidChangeActiveTextEditor();

export const onDidChangeVisibleTextEditors: Event<readonly TextEditor[]> =
    _onDidChangeVisibleTextEditorsEmitter.event;

export async function showTextDocument(
    document: TextDocument,
    column?: ViewColumn,
    preserveFocus?: boolean,
): Promise<TextEditor> {
    console.log(
        `🌟 WINDOW: showing TEXT_EDITOR for document=${document.fileName} at column=${column} with`,
        { preserveFocus },
    );
    return new TextEditorImpl();
}

export function createOutputChannel(
    name: string,
    languageId?: string,
): OutputChannel {
    unusedWowo({ languageId });
    return new OutputChannelImpl(name);
}
