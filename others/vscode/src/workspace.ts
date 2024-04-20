import {
    TextDocument,
    TextEditor,
    ViewColumn,
    Event,
    Disposable,
} from 'vscode';
import { unimplementedWowo } from './helpers';

export const workspaceFolders = [
    {
        uri: {
            fsPath: process.env.HOME + '/github/cph/others/playground',
        },
    },
];

export async function openTextDocument(fileName: string) {
    return unimplementedWowo<TextDocument>(fileName);
}

export async function showTextDocument(
    document: TextDocument,
    column?: ViewColumn,
    preserveFocus?: boolean,
) {
    return unimplementedWowo<TextEditor>(document, column, preserveFocus);
}

export const onDidCloseTextDocument: Event<TextDocument> = function <T>(
    listener: (e: T) => any,
    thisArgs?: any,
    disposables?: Disposable[],
): Disposable {
    return unimplementedWowo(listener, thisArgs, disposables);
};
