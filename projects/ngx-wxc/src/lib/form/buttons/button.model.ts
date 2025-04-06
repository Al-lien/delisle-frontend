import { EventEmitter } from '@angular/core';

export interface IButtonModel {
  label: string;
  disabled: boolean;
  btnClick: EventEmitter<void>;
}
