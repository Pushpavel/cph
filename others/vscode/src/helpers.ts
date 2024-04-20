export function unimplementedWowo<T>(...params: any[]) {
    console.info('🔥 Unimplemented wowo', params);
    throw Error('🔥 Unimplemented wowo');
    return null as T;
}

export function unusedWowo(...params: any[]) {
    console.info('▪️ Unused wowo', params);
}
