# safeSubscribe
Automatically unsubscribes from RxJS observables in Angular components.

## How to install

```bash
npm i @mszewcz/safe-subscribe
```

## How to use

Use it as you would use RxJS `subscribe` operator, just pass component instance (`this`) as first parameter.
Be sure to implement ngOnDestroy method in your component.

Example component:
```ts
import { Component, OnDestroy, OnInit } from '@angular/core';

import { interval } from 'rxjs';
import '@mszewcz/safe-subscribe';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnDestroy, OnInit {
    
    public ngOnInit(): void {    
        interval(1000).safeSubscribe(
            this,
            val => console.log(val)
        );
    }

    /**
     * required by safeSubscribe
     */    
    public ngOnDestroy(): void {
    }
}
```
