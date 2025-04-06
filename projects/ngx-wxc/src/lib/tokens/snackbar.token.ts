import { ComponentType } from '@angular/cdk/portal';
import { InjectionToken } from '@angular/core';
import {
  ISnackbarComponent,
  NgxWxcDefaultSnackbarComponent,
} from '../components';
import { DefaultSnackbarService, ISnackbarService } from '../services';

export const SNACKBAR_COMPONENT_TOKEN = new InjectionToken<
  ComponentType<ISnackbarComponent>
>('SNACKBAR_COMPONENT_TOKEN', {
  factory: (): ComponentType<ISnackbarComponent> =>
    NgxWxcDefaultSnackbarComponent,
});

export const SNACKBAR_SERVICE_TOKEN = new InjectionToken<ISnackbarService>(
  'ERROR_TRANSLATE_SERVICE_TOKEN',
  {
    factory: (): ISnackbarService => new DefaultSnackbarService(),
  }
);
