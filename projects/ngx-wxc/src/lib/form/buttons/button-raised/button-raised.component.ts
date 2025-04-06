import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AbstractButtonComponent } from '../abstract-button.component';

export const ButtonTypeEnum = {
  button: 'button',
  menu: 'menu',
  reset: 'reset',
  submit: 'submit',
};

export const ButtonColorEnum = {
  accent: 'accent',
  primary: 'primary',
  warn: 'warn',
  info: 'info',
};

export type ButtonType = keyof typeof ButtonTypeEnum;
export type ButtonColor = keyof typeof ButtonColorEnum;

@Component({
  selector: 'ngx-wxc-button-raised',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './button-raised.component.html',
  styles: '.ngx-wxc-button-raised{ width: 100%;}',
})
export class NgxWxcButtonRaisedComponent extends AbstractButtonComponent {
  @Input() public type: ButtonType = 'button';
  @Input() public color: ButtonColor = 'primary';

  public onClick(): void {
    this.btnClick.emit();
  }
}
