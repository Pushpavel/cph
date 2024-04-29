// @ts-ignore
const vscode = require('vscode');
vscode.api.serve().then(async () => {
    const ext = require('./extension');
    ext.activate(vscode.context);
});
