import type { Disposable } from 'vscode';

export function unimplementedWowo<T>(...params: any[]) {
    console.info('🔥 Unimplemented wowo', params);
    throw Error('🔥 Unimplemented wowo');
    return null as T;
}

export function unusedWowo(...params: any[]) {
    console.info('▪️ Unused wowo', params);
}

export function disposableWowo(...params: any[]) {
    return {
        dispose() {
            console.log(`💩 Disposing wowo unexpectedly`, params);
        },
    } as Disposable;
}
