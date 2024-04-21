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

export async function executeCommand(
    command: string,
    ...rest: any[]
): Promise<void> {
    console.log(`🌟 COMMAND(${command}) Executing with`, rest);
    // this function originally had a return value
}
