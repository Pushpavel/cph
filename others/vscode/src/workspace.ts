import {
    TextDocument,
    TextEditor,
    ViewColumn,
    Event,
    WorkspaceConfiguration,
    ConfigurationScope,
} from 'vscode';
import { unimplementedWowo, unusedWowo } from './helpers';
import { WorkspaceConfigurationImpl } from './impl/WorkspaceConfigurationImpl';
import { EventEmitterImpl } from './impl/EventEmitterImpl';

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

// #hack
const _onDidCloseTextDocumentEmitter = new EventEmitterImpl<TextDocument>();

export const onDidCloseTextDocument: Event<TextDocument> =
    _onDidCloseTextDocumentEmitter.event;

export function getConfiguration(
    section?: string,
    scope?: ConfigurationScope | null,
): WorkspaceConfiguration {
    unusedWowo(section, scope);
    return new WorkspaceConfigurationImpl();
}
