export function unimplementedWowo<T>(...params: any[]) {
    console.info('🔥 Unimplemented wowo', params, unimplementedWowo.caller());
    throw Error('🔥 Unimplemented wowo');
    return null as T;
}
