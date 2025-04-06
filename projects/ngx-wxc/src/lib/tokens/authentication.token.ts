import { InjectionToken } from '@angular/core';
import {
  DefaultAuthenticationService,
  IAuthenticationService,
} from '../services';

export const AUTHENTICATION_SERVICE_TOKEN =
  new InjectionToken<IAuthenticationService>('AUTHENTICATION_SERVICE_TOKEN', {
    factory: (): IAuthenticationService => new DefaultAuthenticationService(),
  });
