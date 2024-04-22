function acquireVsCodeApi() {
    return {
        postMessage(message: any) {
            console.log(message);
            window.fetch(window.location.href + '/post-message-to-vscode', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(message),
            });
        },
    };
}
window.acquireVsCodeApi = acquireVsCodeApi;
