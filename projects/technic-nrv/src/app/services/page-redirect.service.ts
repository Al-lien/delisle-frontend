import { Injectable, signal, WritableSignal } from '@angular/core';
import { IPageRedirectService } from '@ngx-wxc';

@Injectable({
  providedIn: 'root',
})
export class PageRedirectService implements IPageRedirectService {
  private readonly _redirected: WritableSignal<boolean> = signal(false);

  public setRedirected(value: boolean): void {
    this._redirected.set(value);
  }

  public isRedirected(): boolean {
    return this._redirected();
  }
}
