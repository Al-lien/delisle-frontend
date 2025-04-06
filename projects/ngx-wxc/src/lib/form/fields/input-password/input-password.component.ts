import { AsyncPipe, KeyValuePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  FloatLabelType,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';
import { ErrorTranslateService } from '../../../services';
import { ERROR_TRANSLATE_SERVICE_TOKEN } from '../../../tokens';

export const PasswordInputEnum = {
  text: 'text',
  password: 'password',
};

export type PasswordInput = keyof typeof PasswordInputEnum;

@Component({
  selector: 'ngx-wxc-input-password',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    KeyValuePipe,
    AsyncPipe,
  ],
  templateUrl: './input-password.component.html',
  styleUrl: './input-password.component.scss',
})
export class NgxWxcInputPasswordComponent {
  @ViewChild(MatInput) public input: MatInput | undefined;

  @Input() public ariaLabel!: string;
  @Input() public autocomplete = 'off';
  @Input() public control!: FormControl;
  @Input() public searchFieldVal?: string;
  @Input() public type: PasswordInput = 'password';
  @Input() public label!: string;
  @Input() public floatLabel?: FloatLabelType;
  @Input() public placeholder!: string;
  @Input() public required: boolean = true;
  @Input() public errorPath?: string;
  @Input() public hintLabel!: string;
  @Input() public hideButton: boolean = false;
  @Input() public hideButtonTitle?: string;
  @Input() public matIcon: string = 'visibility_off';

  @Output() public textChange: EventEmitter<string> =
    new EventEmitter<string>();

  public hide: WritableSignal<boolean>;

  constructor(
    @Inject(ERROR_TRANSLATE_SERVICE_TOKEN)
    private readonly _errorTranslateService: ErrorTranslateService
  ) {
    this.hide = signal<boolean>(true);
  }

  public onTextChange(): void {
    this.textChange.emit(this.control.value);
  }

  public getFloatLabel(): FloatLabelType {
    if (this.floatLabel !== null && this.floatLabel !== undefined) {
      return this.floatLabel;
    }
    return this.control.disabled ? 'always' : 'auto';
  }

  public getError(errorKey: string): Observable<string | string[]> {
    return this._errorTranslateService.get(`${this.errorPath}.${errorKey}`);
  }

  public onHideEvent(event: MouseEvent): void {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  public focus(): void {
    if (this.input === null || this.input === undefined) {
      return;
    }
    this.input.focus();
  }

  public onPasswordForgotten(): void {
    // TODO: implements forgot password logic
    console.log('We sent you a new password!');
  }
}
