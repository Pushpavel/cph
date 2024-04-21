import { disposableWowo, unusedWowo } from './helpers';
import type { Disposable } from 'vscode';

export function registerCommand(
    command: string,
    callback: (...args: any[]) => any,
    thisArg?: any,
): Disposable {
    unusedWowo(callback, thisArg);
    console.log(`🌟 COMMAND[${command}: registering`);
    return disposableWowo(`COMMAND[${command}]`);
}
