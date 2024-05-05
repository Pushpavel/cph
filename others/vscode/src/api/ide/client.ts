import { TextEditor, Event } from 'vscode';
import { sharedSSEEventEmitter as sharedJsonSSEEventEmitter } from './sse-utils';
import { map } from 'rxjs';
import { TextEditorImpl } from '../../impl/TextEditorImpl';
import { unusedWowo } from '../../helpers';

const activeFileChangeEmitter = sharedJsonSSEEventEmitter<
    TextEditor | undefined
>('http://localhost:5678/events/activeFile', undefined, (x) =>
    x.pipe(
        map((activeFile) => {
            unusedWowo(activeFile);
            return new TextEditorImpl();
        }),
    ),
);

export function onDidChangeActiveTextEditor(): Event<TextEditor | undefined> {
    return activeFileChangeEmitter.event;
}
