import type { Disposable } from 'vscode';
import { UriImpl } from './impl/UriImpl';

export const extensionUri = new UriImpl('/static');

export const subscriptions: Disposable[] = [];
