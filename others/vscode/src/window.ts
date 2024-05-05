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
import { registerWebviewViewProvider } from './api/webview';

class WindowImpl {
    // #hack
    activeTextEditor = undefined;

    registerWebviewViewProvider = registerWebviewViewProvider;

    showErrorMessage(msg: string) {
        console.error('🌟 ERROR_MESSAGE:', msg);
    }

    showInfoMessage(msg: string) {
        console.info('🌟 INFO_MESSAGE:', msg);
    }

    async showQuickPick(items: string[]) {
        // #hack
        console.log('🌟 QUICK_PICK: showing', items, `Choosing ${items[0]}`);
        return items[0];
    }

    createStatusBarItem(
        alignment?: StatusBarAlignment,
        priority?: number,
    ): StatusBarItem {
        const StatusBarItem = new StatusBarItemImpl(alignment);
        StatusBarItem.priority = priority;
        return StatusBarItem;
    }

    // #hack
    _onDidChangeVisibleTextEditorsEmitter = new EventEmitterImpl<
        readonly TextEditor[]
    >();

    get onDidChangeActiveTextEditor() {
        return ideClient.onDidChangeActiveTextEditor();
    }
    onDidChangeVisibleTextEditors: Event<readonly TextEditor[]> =
        this._onDidChangeVisibleTextEditorsEmitter.event;

    async showTextDocument(
        document: TextDocument,
        column?: ViewColumn,
        preserveFocus?: boolean,
    ): Promise<TextEditor> {
        console.log(
            `🌟 WINDOW: showing TEXT_EDITOR for document=${document.fileName} at column=${column} with`,
            { preserveFocus },
        );
        return new TextEditorImpl(document);
    }

    createOutputChannel(name: string, languageId?: string): OutputChannel {
        unusedWowo({ languageId });
        return new OutputChannelImpl(name);
    }
}

export default new WindowImpl();
