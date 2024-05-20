function acquireVsCodeApi() {
    const ws = new WebSocket(
        `ws://${window.location.host}${window.location.pathname.replace(
            /\/+$/,
            '',
        )}/${(window as any).viewid}/messages`,
        [],
    );
    const connected = new Promise<void>((r) => {
        ws.onopen = () => r();
    });

    ws.onmessage = (e) => {
        window.postMessage(JSON.parse(e.data));
    };
    return {
        async postMessage(message: any) {
            await connected;
            ws.send(JSON.stringify(message));
        },
        // #hack localStorage may not behave as expected, may depend on the IDE
        getState() {
            const state = localStorage.getItem('vscodestate');
            if (state != null) return JSON.parse(state);
        },
        setState(state: any) {
            if (state == null) {
                localStorage.removeItem('vscodestate');
            }
            localStorage.setItem('vscodestate', JSON.stringify(state));
        },
    };
}
window.acquireVsCodeApi = acquireVsCodeApi;
