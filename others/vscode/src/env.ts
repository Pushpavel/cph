import type {
    TelemetryLogger,
    TelemetryLoggerOptions,
    TelemetrySender,
} from 'vscode';
import { TelemetryLoggerImpl } from './impl/TelemetryLoggerImpl';

export function createTelemetryLogger(
    sender: TelemetrySender,
    options?: TelemetryLoggerOptions,
): TelemetryLogger {
    return new TelemetryLoggerImpl(sender, options);
}
