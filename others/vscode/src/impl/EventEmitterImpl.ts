import { Event, EventEmitter, Disposable } from 'vscode';
import { EventEmitter as NodeEventEmitter } from 'stream';
import { unimplementedWowo } from '../helpers';

export class EventEmitterImpl<T> implements EventEmitter<T> {
    _events = new NodeEventEmitter();
    _eventName = 'something';

    get event(): Event<T> {
        // #hack
        return (
            listener: (e: T) => any,
            thisArgs?: any,
            disposables?: Disposable[],
        ): Disposable => {
            if (thisArgs) listener = listener.bind(thisArgs);

            const events = this._events;
            const eventName = this._eventName;
            events.on(this._eventName, listener);

            // removes listener
            const disposable: Disposable = {
                dispose() {
                    events.off(eventName, listener);
                },
            };

            // not sure why, but vscode impl is doing this https://github.com/microsoft/vscode/blob/73a2c100f6229b231d6b255e36d1789c25d92285/src/vs/base/common/event.ts#L1085
            disposables?.push(disposable);

            return disposable;
        };
    }
    fire(data: T): void {
        this._events.emit(this._eventName, data);
    }
    dispose(): void {
        this._events.removeAllListeners(this._eventName);
    }
}
