export { default as window } from './window';
export * as workspace from './workspace';
export * as commands from './commands';
export * as context from './context';
export * as env from './env';
export * from './misc';
export * as api from './api';

export { UriImpl as Uri } from './impl/UriImpl';
export { EventEmitterImpl as EventEmitter } from './impl/EventEmitterImpl';

export type { ExtensionContext, TextEditor } from 'vscode';
