import { Observable, Subscription } from 'rxjs';

export function safeSubscribe<T>(classRef: any, next?: (value: T) => void, error?: (error: any) => void, complete?: () => void): Subscription {
    if (typeof classRef !== 'object') {
        throw new Error('First argument is not an object. Did you mean to pass \'this\'?');
    }

    const doesDestructorExist = (typeof classRef['ngOnDestroy'] === 'function');
    const doesSubscriptionSetExist = (typeof classRef['__sso'] === 'object');
    const sub = this.subscribe(next, error, complete);

    if (!doesSubscriptionSetExist) {
        classRef['__sso'] = [];
        if (doesDestructorExist) {
            const temp = classRef['ngOnDestroy'];
            classRef['ngOnDestroy'] = function () {
                classRef['__sso'].forEach(function (s) {
                    s.unsubscribe();
                });
                classRef['__sso'].clear();
                temp.call(classRef);
            };
        } else {
            console.error(`SSO: ngOnDestroy method missing in ${classRef.constructor.name}`);
        }
    }
    classRef['__sso'].push(sub);

    return sub;
}

declare module 'rxjs/internal/Observable' {
    interface Observable<T> {
        safeSubscribe: typeof safeSubscribe;
    }
}

Observable.prototype.safeSubscribe = safeSubscribe;

