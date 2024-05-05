import { Observable, Subject, Subscription } from 'rxjs';
import type { Event, EventEmitter, Disposable } from 'vscode';
import { unimplementedWowo } from '../helpers';

export class ObservableEventEmitter<T> implements EventEmitter<T> {
    private subs = new Subscription();
    constructor(private observable: Observable<T>) {}
    get event(): Event<T> {
        return (
            listener: (e: T) => any,
            thisArgs?: any,
            disposables?: Disposable[],
        ): Disposable => {
            if (thisArgs) listener = listener.bind(thisArgs);

            const sub = this.observable.subscribe(listener);
            this.subs.add(sub);
            // removes listener
            const disposable: Disposable = {
                dispose() {
                    sub.unsubscribe();
                },
            };

            // not sure why, but vscode impl is doing this https://github.com/microsoft/vscode/blob/73a2c100f6229b231d6b255e36d1789c25d92285/src/vs/base/common/event.ts#L1085
            disposables?.push(disposable);

            return disposable;
        };
    }
    fire(data: T): void {
        unimplementedWowo('Should not call fire in ObservableEventEmitter', {
            data,
        });
    }
    dispose(): void {
        this.subs.unsubscribe();
    }
}

export class EventEmitterImpl<T> extends ObservableEventEmitter<T> {
    constructor(private subject = new Subject<T>()) {
        super(subject);
    }
    fire(data: T): void {
        this.subject.next(data);
    }
    dispose(): void {
        this.subject.complete();
        super.dispose();
    }
}
