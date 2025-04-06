import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface IErrorTranslateService {
  /**
   * Gets the translated value of a key (or and array of keys)
   * @param key path to i18n file
   * @returns the translated key, or an object of translated keys
   */
  get(key: string | string[]): Observable<string | string[]>;
}

export type ErrorTranslateService = IErrorTranslateService;

@Injectable({
  providedIn: 'root',
})
export class DefaultErrorTranslateService implements IErrorTranslateService {
  public get(key: string | string[]): Observable<string | string[]> {
    return of(key);
  }
}
