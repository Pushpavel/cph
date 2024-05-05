import type {
    EndOfLine,
    Position,
    TextDocument,
    TextLine,
    Range,
    Uri,
} from 'vscode';
import { unimplementedWowo } from '../helpers';
import { UriImpl } from './UriImpl';

export class TextDocumentImpl implements TextDocument {
    // #hack
    uri: Uri;
    constructor(filepath: string) {
        this.uri = new UriImpl(filepath);
    }
    get languageId(): string {
        return unimplementedWowo();
    }
    get version(): number {
        return unimplementedWowo();
    }
    get lineCount(): number {
        return unimplementedWowo();
    }
    offsetAt(position: Position): number {
        return unimplementedWowo(position);
    }
    getText(range?: Range | undefined): string {
        return unimplementedWowo(range);
    }
    get fileName(): string {
        return this.uri.path;
    }
    get isUntitled(): boolean {
        return unimplementedWowo();
    }
    get isDirty(): boolean {
        return unimplementedWowo();
    }
    get isClosed(): boolean {
        return unimplementedWowo();
    }
    async save() {
        return unimplementedWowo<boolean>();
    }
    get eol(): EndOfLine {
        return unimplementedWowo();
    }
    lineAt(line: number | Position): TextLine {
        return unimplementedWowo(line);
    }
    positionAt(offset: number): Position {
        return unimplementedWowo(offset);
    }
    getWordRangeAtPosition(
        position: Position,
        regex?: RegExp,
    ): Range | undefined {
        return unimplementedWowo(position, regex);
    }
    validateRange(range: Range): Range {
        return unimplementedWowo(range);
    }
    validatePosition(position: Position): Position {
        return unimplementedWowo(position);
    }
}
