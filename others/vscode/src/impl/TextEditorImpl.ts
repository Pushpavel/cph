import type {
    DecorationOptions,
    Position,
    Range,
    Selection,
    SnippetString,
    TextDocument,
    TextEditor,
    TextEditorDecorationType,
    TextEditorEdit,
    TextEditorOptions,
    TextEditorRevealType,
    ViewColumn,
} from 'vscode';
import { unimplementedWowo } from '../helpers';

export class TextEditorImpl implements TextEditor {
    get document(): TextDocument {
        return unimplementedWowo();
    }
    get selection(): Selection {
        return unimplementedWowo();
    }
    get selections(): readonly Selection[] {
        return unimplementedWowo();
    }
    get visibleRanges(): readonly Range[] {
        return unimplementedWowo();
    }
    get options(): TextEditorOptions {
        return unimplementedWowo();
    }
    get viewColumn(): ViewColumn | undefined {
        return unimplementedWowo();
    }
    edit(
        callback: (editBuilder: TextEditorEdit) => void,
        options?:
            | {
                  readonly undoStopBefore: boolean;
                  readonly undoStopAfter: boolean;
              }
            | undefined,
    ): Thenable<boolean> {
        return unimplementedWowo(callback, options);
    }
    insertSnippet(
        snippet: SnippetString,
        location?:
            | Range
            | readonly Range[]
            | Position
            | readonly Position[]
            | undefined,
        options?:
            | {
                  readonly undoStopBefore: boolean;
                  readonly undoStopAfter: boolean;
              }
            | undefined,
    ): Thenable<boolean> {
        return unimplementedWowo(snippet, location, options);
    }
    setDecorations(
        decorationType: TextEditorDecorationType,
        rangesOrOptions: readonly Range[] | readonly DecorationOptions[],
    ): void {
        return unimplementedWowo(decorationType, rangesOrOptions);
    }
    revealRange(
        range: Range,
        revealType?: TextEditorRevealType | undefined,
    ): void {
        return unimplementedWowo(range, revealType);
    }
    show(column?: ViewColumn | undefined): void {
        return unimplementedWowo(column);
    }
    hide(): void {
        return unimplementedWowo();
    }
}
