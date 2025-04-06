import { ComponentType } from '@angular/cdk/portal';
import { InjectionToken } from '@angular/core';
import { IDialogComponent, NgxWxcDefaultDialogComponent } from '../components';

export const DIALOG_COMPONENT_TOKEN = new InjectionToken<
  ComponentType<IDialogComponent>
>('DIALOG_COMPONENT_TOKEN', {
  factory: (): ComponentType<IDialogComponent> => NgxWxcDefaultDialogComponent,
});
