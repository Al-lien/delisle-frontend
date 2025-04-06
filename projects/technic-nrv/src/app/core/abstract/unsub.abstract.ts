import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
/**
 * Abstract class handling all unsubscritpion from Observable
 * using the {@code takeUntil} pipe
 */
export abstract class Unsub implements OnDestroy {
  public _unsubscribe$: Subject<void> = new Subject<void>();

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
