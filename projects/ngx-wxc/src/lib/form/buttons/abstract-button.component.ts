import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { IButtonModel } from './button.model';

@Component({
  template: '',
})
export abstract class AbstractButtonComponent implements IButtonModel {
  @Input() public label!: string;
  @Input() public disabled!: boolean;
  @Input() public ariaLabel?: string;
  @Output() public btnClick: EventEmitter<void> = new EventEmitter<void>();

  @HostBinding('style.width.%') public width = '100';
  @HostBinding('style.display') public display = 'block';
}
