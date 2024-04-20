import { unimplementedWowo } from './helpers';
import { Disposable } from 'vscode';

export function registerCommand(
    command: string,
    callback: (...args: any[]) => any,
    thisArg?: any,
): Disposable {
    return unimplementedWowo<Disposable>(command, callback, thisArg);
}
