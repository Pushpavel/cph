import { unimplementedWowo, unusedWowo } from './helpers';
import { Disposable } from 'vscode';

export function registerCommand(
    command: string,
    callback: (...args: any[]) => any,
    thisArg?: any,
): Disposable {
    unusedWowo(callback, thisArg);
    console.log(`🌟 COMMAND[${command}: registering`);
    return {
        dispose() {
            unimplementedWowo();
        },
    };
}
