import {
    TextDocument,
    TextEditor,
    ViewColumn,
    Event,
    Disposable,
    WorkspaceConfiguration,
    ConfigurationScope,
} from 'vscode';
import { unimplementedWowo, unusedWowo } from './helpers';
import { WorkspaceConfigurationImpl } from './impl/WorkspaceConfigurationImpl';

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

export function getConfiguration(
    section?: string,
    scope?: ConfigurationScope | null,
): WorkspaceConfiguration {
    unusedWowo(section, scope);
    return new WorkspaceConfigurationImpl();
}
