import { InjectionToken } from '@angular/core';
import { ILanguageService } from '../core';

export const LANGUAGE_SERVICE_TOKEN = new InjectionToken<ILanguageService>(
  'LANGUAGE_SERVICE_TOKEN'
);
