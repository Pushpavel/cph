function acquireVsCodeApi() {
    const ws = new WebSocket(
        window.location.href.replace('http', 'ws') +
            '/' +
            (window as any).viewid +
            '/messages',
        [],
    );
    const connected = new Promise<void>((r) => {
        ws.onopen = () => r();
    });
    return {
        async postMessage(message: any) {
            await connected;
            ws.send(JSON.stringify(message));
        },
    };
}
window.acquireVsCodeApi = acquireVsCodeApi;
