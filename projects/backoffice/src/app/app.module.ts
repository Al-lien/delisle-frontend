import { DATE_PIPE_DEFAULT_OPTIONS, registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import localeFr from '@angular/common/locales/fr';
import { LOCALE_ID, NgModule, PLATFORM_ID } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import {
  HttpClient,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  AUTHENTICATION_SERVICE_TOKEN,
  authInterceptor,
  ERROR_TRANSLATE_SERVICE_TOKEN,
  ILanguageService,
  LANGUAGE_SERVICE_TOKEN,
  NgxWxcDefaultSnackbarComponent,
  NgxWxcLanguageService,
  PAGE_REDIRECT_SERVICE_TOKEN,
  ROLE_REDIRECT_SERVICE_TOKEN,
  SNACKBAR_COMPONENT_TOKEN,
  SNACKBAR_SERVICE_TOKEN,
} from '@ngx-wxc';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorTranslateService } from './core/services/error-translate.service';
import { SnackbarService } from './core/services/snackbar.service';
import { AuthenticationService } from './services/authentication.service';
import { PageRedirectService } from './services/page-redirect.service';
import { RoleRedirectService } from './services/role-redirect.service';

registerLocaleData(localeFr);
registerLocaleData(localeEn);

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      defaultLanguage: 'fr',
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
        },
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authInterceptor]), withFetch()),
    {
      provide: ERROR_TRANSLATE_SERVICE_TOKEN,
      useExisting: ErrorTranslateService,
    },
    {
      provide: SNACKBAR_SERVICE_TOKEN,
      useExisting: SnackbarService,
    },
    {
      provide: SNACKBAR_COMPONENT_TOKEN,
      useValue: NgxWxcDefaultSnackbarComponent,
    },
    {
      provide: LANGUAGE_SERVICE_TOKEN,
      useFactory: (
        platformId: object,
        translateService: TranslateService
      ): ILanguageService => {
        return new NgxWxcLanguageService(platformId, translateService);
      },
      deps: [PLATFORM_ID, TranslateService],
    },
    {
      provide: LOCALE_ID,
      useFactory: (_languageService: NgxWxcLanguageService): string =>
        _languageService.getLocale(),
      deps: [NgxWxcLanguageService],
    },
    {
      provide: AUTHENTICATION_SERVICE_TOKEN,
      useExisting: AuthenticationService,
    },
    {
      provide: PAGE_REDIRECT_SERVICE_TOKEN,
      useExisting: PageRedirectService,
    },
    {
      provide: ROLE_REDIRECT_SERVICE_TOKEN,
      useExisting: RoleRedirectService,
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: { duration: 50000 },
    },
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: { dateFormat: 'mediumDate' },
    },
    {
      provide: MAT_TOOLTIP_DEFAULT_OPTIONS,
      useValue: {
        showDelay: 500,
        hideDelay: 300,
        positionAtOrigin: true,
      },
    },
  ],
})
export class AppModule {}
