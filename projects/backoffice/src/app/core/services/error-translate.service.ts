import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IErrorTranslateService } from '@ngx-wxc';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorTranslateService implements IErrorTranslateService {
  private readonly _translateService = inject(TranslateService);

  /**
   * Gets the translated value of a key(or and array of keys)
   * @param key : path to i18n error text
   * @returns the translated key, or an object of translated keys
   */
  public get(key: string | string[]): Observable<string | string[]> {
    let translatedKey: string | string[] = [];
    this._translateService
      .get(key)
      .subscribe((x: string) => (translatedKey = x));
    return of(translatedKey);
  }
}
