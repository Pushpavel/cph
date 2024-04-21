import {
    Event,
    TelemetryLogger,
    TelemetrySender,
    TelemetryLoggerOptions,
} from 'vscode';
import { unimplementedWowo } from '../helpers';
import { EventEmitterImpl } from './EventEmitterImpl';

export class TelemetryLoggerImpl implements TelemetryLogger {
    constructor(
        private _sender: TelemetrySender,
        private _options?: TelemetryLoggerOptions,
    ) {}
    _onDidChangeEnableStates = new EventEmitterImpl<TelemetryLogger>();
    onDidChangeEnableStates: Event<TelemetryLogger> =
        this._onDidChangeEnableStates.event.bind(this);
    isUsageEnabled: boolean = false;
    isErrorsEnabled: boolean = false;
    logUsage(eventName: string, data?: Record<string, any> | undefined): void {
        if (!this.isUsageEnabled) return;
        unimplementedWowo(eventName, data);
    }
    logError(
        eventNameOrException: Error | string,
        data?: Record<string, any>,
    ): void {
        if (!this.isErrorsEnabled) return;
        unimplementedWowo(eventNameOrException, data);
    }
    dispose(): void {
        unimplementedWowo();
    }
}
