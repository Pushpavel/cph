import type { WebviewViewProvider, Disposable } from 'vscode';
import { disposableWowo, unimplementedWowo } from '../../helpers';

export const registeredWebviewViewProviders: Record<
    string,
    WebviewViewProvider
> = {};

export function registerWebviewViewProvider(
    viewId: string,
    provider: WebviewViewProvider,
    options?: {
        readonly webviewOptions?: {
            readonly retainContextWhenHidden?: boolean;
        };
    },
): Disposable {
    console.log(`🌟 WEBVIEW_VIEW_PROVIDER(${viewId}): registering with `, {
        provider,
        options,
    });
    if (viewId in registeredWebviewViewProviders) {
        unimplementedWowo(`
        '${viewId}' is already registered, we did not anticipate that it will be called more than once.
        now what shall we do ? dispose previous instance and add this ?
        `);
    }

    registeredWebviewViewProviders[viewId] = provider;

    return disposableWowo(`registeredWebviewViewProvider:`, {
        viewId,
        provider,
        options,
    });
}
