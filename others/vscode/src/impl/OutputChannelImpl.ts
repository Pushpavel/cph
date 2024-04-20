import { OutputChannel, ViewColumn } from 'vscode';
import { EOL } from 'os';
export class OutputChannelImpl implements OutputChannel {
    currentLine = '';
    log_prefix = `🌟 OUTPUT_CHANNEL(${this.name})`;
    constructor(readonly name: string) {}
    _push(value: string) {
        const multiline = value.includes(EOL);
        const values = value.split(EOL);
        for (const line of values) {
            this.currentLine += line;
            if (multiline) this._flush();
        }
    }
    _flush() {
        if (this.currentLine) {
            console.log(this.log_prefix, this.currentLine);
        }
        this.currentLine = '';
    }
    append(value: string): void {
        this._push(value);
    }
    appendLine(value: string): void {
        this._push(value);
        this._flush();
    }
    replace(value: string): void {
        this._push('🗑️ ' + value);
    }
    clear(): void {
        console.log(this.log_prefix, 'clearing 🧹');
    }
    show(
        columnOrPreserveFocus?: ViewColumn | boolean,
        preserveFocus?: boolean,
    ): void {
        console.log(this.log_prefix, 'showing with', {
            columnOrPreserveFocus,
            preserveFocus,
        });
    }
    hide(): void {
        console.log(this.log_prefix, 'hiding 👻');
    }
    dispose(): void {
        console.log(this.log_prefix, 'disposing 💩');
    }
}
