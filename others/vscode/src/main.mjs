// @ts-ignore
import * as vscode from 'vscode';

// https://stackoverflow.com/questions/51069002/convert-import-to-synchronous
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

vscode.api.serve().then(async () => {
    const ext = require('./extension');
    ext.activate(vscode.context);
});
