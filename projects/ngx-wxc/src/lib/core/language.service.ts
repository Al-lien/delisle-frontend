import { isPlatformBrowser } from '@angular/common';
import { afterRender, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export interface ILanguageService {
  _keyLanguage: string;
  _userLanguage: string;
  _supportedLanguages: string[];
  initLanguage(): void;
  getLocale(): string;
}

export type LanguageService = ILanguageService;

@Injectable({
  providedIn: 'root',
})
export class NgxWxcLanguageService implements ILanguageService {
  public _keyLanguage: string = '_userLanguage';
  public _userLanguage: string = '';

  public _supportedLanguages: string[] = ['en', 'fr'];

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: object,
    private readonly _translateService: TranslateService
  ) {
    afterRender(() => {
      this.initLanguage();
      this._translateService.use(this._userLanguage);
    });
  }

  get userLanguage(): string {
    return this._userLanguage;
  }

  public getLocale(): string {
    if (isPlatformBrowser(this.platformId)) {
      return navigator.language || 'fr-FR';
    }

    return 'fr-FR';
  }

  public initLanguage(): void {
    const value = localStorage.getItem(this._keyLanguage);
    if (value != null) {
      this._userLanguage = value;
    } else {
      const browserLanguage = navigator.language.split('-')[0];
      this._userLanguage = 'en';

      if (this._supportedLanguages.includes(browserLanguage)) {
        this._userLanguage = browserLanguage;
        localStorage.setItem(this._keyLanguage, browserLanguage);
      }
    }
  }

  public setLanguage(language: string): void {
    this._userLanguage = language;
    localStorage.setItem(this._keyLanguage, this._userLanguage);
    this._translateService.use(this._userLanguage);
  }

  public getAvailableLanguages(): string[] {
    return this._supportedLanguages;
  }
}
