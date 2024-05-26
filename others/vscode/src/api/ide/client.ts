import { TextEditor, Event, TextDocument } from 'vscode';
import { sharedSSEEventEmitter as sharedJsonSSEEventEmitter } from './sse-utils';
import { switchMap } from 'rxjs';
import { TextEditorImpl } from '../../impl/TextEditorImpl';
import workspace from '../../workspace';
// import { config } from 'rxjs';

// config.onUnhandledError = (err: any) => console.error(err);
const onDidChangeActiveTextEditorEmitter = sharedJsonSSEEventEmitter<
    TextEditor | undefined
>('http://localhost:5678/events/onDidChangeActiveTextEditor', undefined, (x) =>
    x.pipe(
        switchMap(async (activeFile) => {
            if (activeFile == null) return undefined;
            const textDocument = await workspace.openTextDocument(activeFile);
            return new TextEditorImpl(textDocument);
        }),
    ),
);

const onDidCloseTextDocumentEmitter = sharedJsonSSEEventEmitter<TextDocument>(
    'http://localhost:5678/events/onDidCloseTextDocument',
    undefined,
    (x) =>
        x.pipe(
            switchMap(async (activeFile) => {
                return await workspace.openTextDocument(activeFile);
            }),
        ),
);

export function onDidChangeActiveTextEditor(): Event<TextEditor | undefined> {
    console.log('registering ... 21e23e 242342 4234');
    onDidChangeActiveTextEditorEmitter.event((e) =>
        console.log('$$$$$$$$$$$$$$$$', e),
    );
    return onDidChangeActiveTextEditorEmitter.event;
}

export function onDidCloseTextDocument(): Event<TextDocument> {
    return onDidCloseTextDocumentEmitter.event;
}
