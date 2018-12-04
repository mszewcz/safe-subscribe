import { Observable } from 'rxjs';
export function safeSubscribe(classRef, next, error, complete) {
    if (typeof classRef !== 'object') {
        throw new TypeError('First argument is not an object. Did you mean to pass \'this\'?');
    }
    var doesDestructorExist = (typeof classRef['ngOnDestroy'] === 'function');
    var doesSubscriptionSetExist = (typeof classRef['__sso'] === 'object');
    var sub = this.subscribe(next, error, complete);
    if (!doesSubscriptionSetExist) {
        classRef['__sso'] = new Set();
        if (doesDestructorExist) {
            var temp_1 = classRef['ngOnDestroy'];
            classRef['ngOnDestroy'] = function () {
                classRef['__sso'].forEach(function (s) {
                    s.unsubscribe();
                });
                classRef['__sso'].clear();
                temp_1.call(classRef);
            };
        }
        else {
            console.error("SSO: ngOnDestroy method missing in " + classRef.constructor.name);
        }
    }
    classRef['__sso'].add(sub);
    return sub;
}
Observable.prototype.safeSubscribe = safeSubscribe;
//# sourceMappingURL=safeSubscribe.js.map