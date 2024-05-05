import { Observable, share } from 'rxjs';
import { ObservableEventEmitter } from '../../impl/EventEmitterImpl';

export function sseJsonObservable<T>(
    url: string | URL,
    eventSourceInitDict?: EventSourceInit,
) {
    return new Observable<T>((observer) => {
        const eventSource = new EventSource(url, eventSourceInitDict);
        eventSource.onmessage = (x) => observer.next(JSON.parse(x.data));
        eventSource.onerror = (x) => observer.error(x);
        return () => {
            eventSource.close();
        };
    });
}

export function sharedSSEEventEmitter<T>(
    url: string | URL,
    eventSourceInitDict?: EventSourceInit,
    pipeBeforeShare: (obs: Observable<any>) => Observable<T> = (obs) => obs,
) {
    return new ObservableEventEmitter(
        pipeBeforeShare(sseJsonObservable<any>(url, eventSourceInitDict)).pipe(
            share(),
        ),
    );
}
