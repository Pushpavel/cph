import { TextEditor, Event } from 'vscode';
import { sharedSSEEventEmitter as sharedJsonSSEEventEmitter } from './sse-utils';
import { switchMap } from 'rxjs';
import { TextEditorImpl } from '../../impl/TextEditorImpl';
import { unusedWowo } from '../../helpers';
import { workspace } from '../..';
// import { config } from 'rxjs';

// config.onUnhandledError = (err: any) => console.error(err);
const activeFileChangeEmitter = sharedJsonSSEEventEmitter<
    TextEditor | undefined
>('http://localhost:5678/events/activeFile', undefined, (x) =>
    x.pipe(
        switchMap(async (activeFile) => {
            unusedWowo(activeFile);
            const textDocument = await workspace.openTextDocument(activeFile);
            return new TextEditorImpl(textDocument);
        }),
    ),
);

export function onDidChangeActiveTextEditor(): Event<TextEditor | undefined> {
    return activeFileChangeEmitter.event;
}
