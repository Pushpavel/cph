import type {
    ViewColumn,
    Event,
    WorkspaceConfiguration,
    ConfigurationScope,
    TextDocument,
} from 'vscode';
import { unimplementedWowo, unusedWowo } from './helpers';
import { WorkspaceConfigurationImpl } from './impl/WorkspaceConfigurationImpl';
import { EventEmitterImpl } from './impl/EventEmitterImpl';
import { TextDocumentImpl } from './impl/TextDocumentImpl';
// import { readFile } from 'fs/promises';

class WorkspaceImpl {
    workspaceFolders = [
        {
            uri: {
                fsPath: process.env.HOME + '/github/cph/others/playground',
            },
        },
    ];

    async openTextDocument(fileName: string): Promise<TextDocument> {
        if (typeof fileName !== 'string') {
            unimplementedWowo(
                `
                the original vscode.workspace.openTextDocument(...) can take args other than just a filepath string, it seems we are using those other signatures
                https://github.com/microsoft/vscode/blob/73a2c100f6229b231d6b255e36d1789c25d92285/src/vs/workbench/api/common/extHost.api.impl.ts#L1018
                `,
            );
        }

        // const content = await readFile(fileName);

        return new TextDocumentImpl(fileName);
    }

    async showTextDocument(
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
    private _onDidCloseTextDocumentEmitter =
        new EventEmitterImpl<TextDocument>();

    onDidCloseTextDocument: Event<TextDocument> =
        this._onDidCloseTextDocumentEmitter.event;

    getConfiguration(
        section?: string,
        scope?: ConfigurationScope | null,
    ): WorkspaceConfiguration {
        unusedWowo(section, scope);
        return new WorkspaceConfigurationImpl();
    }
}

export default new WorkspaceImpl();
