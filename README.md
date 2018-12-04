# safeSubscribe
Automatically unsubscribes from RxJS observables in Angular components/services.

## Installation

```sh
npm i @mszewcz/safe-subscribe
```

## Usage

Use it as you would use RxJS `subscribe` operator, just pass component instance (`this`) as first parameter.

Be sure to implement `ngOnDestroy` method in your component/service.

#### safeSubscribe(classRef: Object, next?: Function, error?: Function, complete?: Function): Subscription

__Arguments:__

* `classRef` - A reference to the object that is holding the observable.
* `next` - A handler for each delivered value.
* `error` - A handler for an error notification.
* `complete` - A handler for the execution-complete notification.

__Returns:__

* A `Subscription` object.

__Example component:__

```ts
import { Component, OnDestroy, OnInit } from '@angular/core';

import { interval } from 'rxjs';
import '@mszewcz/safe-subscribe';

@Component({
    selector: 'app-test',
})
export class TestComponent implements OnDestroy, OnInit {
    
    public ngOnInit(): void {    
        interval(1000).safeSubscribe(
            this,
            val => console.log(val)
        );
    }

    /**
     * At least a noop ngOnDestroy is required for safeSubscribe to work
     */    
    public ngOnDestroy(): void {
    }
}
```
