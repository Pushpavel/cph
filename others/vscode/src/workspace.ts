import type {
    Uri,
    ViewColumn,
    Event,
    WorkspaceConfiguration,
    ConfigurationScope,
} from 'vscode';
import { unimplementedWowo, unusedWowo } from './helpers';
import { WorkspaceConfigurationImpl } from './impl/WorkspaceConfigurationImpl';
import { EventEmitterImpl } from './impl/EventEmitterImpl';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { readFile } from 'fs/promises';

export const workspaceFolders = [
    {
        uri: {
            fsPath: process.env.HOME + '/github/cph/others/playground',
        },
    },
];

export async function openTextDocument(
    fileName: string,
): Promise<TextDocument> {
    if (typeof fileName !== 'string') {
        unimplementedWowo(
            `
            the original vscode.workspace.openTextDocument(...) can take args other than just a filepath string, it seems we are using those other signatures
            https://github.com/microsoft/vscode/blob/73a2c100f6229b231d6b255e36d1789c25d92285/src/vs/workbench/api/common/extHost.api.impl.ts#L1018
            `,
        );
    }

    const content = await readFile(fileName);

    return {
        ...TextDocument.create(fileName, '', 0, content.toString()),
        get languageId(): string {
            return unimplementedWowo();
        },
        get version(): number {
            return unimplementedWowo();
        },
    };
}

export async function showTextDocument(
    document: TextDocument,
    column?: ViewColumn,
    preserveFocus?: boolean,
) {
    console.log(
        `🌟 EDITOR(${document.uri}) showing... at column=${column} with`,
        { preserveFocus },
    );
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
