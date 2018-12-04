import { Subscription } from 'rxjs';
export declare function safeSubscribe<T>(classRef: Object, next?: (value: T) => void, error?: (error: any) => void, complete?: () => void): Subscription;
declare module 'rxjs/internal/Observable' {
    interface Observable<T> {
        safeSubscribe: typeof safeSubscribe;
    }
}
