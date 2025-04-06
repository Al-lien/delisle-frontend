import { Type } from '@angular/core';
import {
  AbstractButtonControlComponent,
  AbstractWidgetComponent,
} from '@ngx-mechanics';

export interface IWidgetDispatcher {
  loadWidgets(): void;
}

export interface IWgtGroup {
  widgets: IWgtSanitized[];
}
export interface IWgtSanitized {
  id: string;
  name: string;
  type: WgtType;
  options?: Record<string, unknown>;
}

export interface IWidget extends IWgtSanitized {
  component: Type<AbstractWidgetComponent>;
}

export interface IBtnCtrlWgt extends IWgtSanitized {
  component: Type<AbstractButtonControlComponent>;
}

export const WgtTypeEnum = {
  BUTTON_CONTROL: 'BUTTON_CONTROL',
  SERVICE: 'SERVICE',
};

export type WgtType = keyof typeof WgtTypeEnum;

export type ID = `${string}-${string}-${string}-${string}-${string}`;
