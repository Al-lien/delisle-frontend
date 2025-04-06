import { Injectable } from '@angular/core';

export interface IPageRedirectService {
  setRedirected(value: boolean): void;
  isRedirected(): boolean;
}

export type PageRedirectService = IPageRedirectService;

@Injectable({
  providedIn: 'root',
})
export class DefaultPageRedirectService implements IPageRedirectService {
  public setRedirected(value: boolean): void {
    return;
  }

  public isRedirected(): boolean {
    return true;
  }
}
