import { InjectionToken } from '@angular/core';
import {
  DefaultErrorTranslateService,
  IErrorTranslateService,
} from '../services';

export const ERROR_TRANSLATE_SERVICE_TOKEN =
  new InjectionToken<IErrorTranslateService>('ERROR_TRANSLATE_SERVICE_TOKEN', {
    factory: (): IErrorTranslateService => new DefaultErrorTranslateService(),
  });
