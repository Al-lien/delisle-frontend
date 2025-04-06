import { NgClass, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'ngx-wxc-password-check',
  templateUrl: './password-check.component.html',
  styleUrl: './password-check.component.scss',
  standalone: true,
  imports: [NgIf, NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// TODO: must improve security
/**
 * PasswordCheckComponent displayed password validity labels.
 * 4 optional criteria :
 *  - at least one lowerCase character,
 *  - at least one upperCase character,
 *  - at least one special character,
 *  - minimum length.
 */
export class NgxWxcPasswordCheckComponent implements OnChanges {
  /**
   * Password form control.
   */
  @Input() public password: string = '';

  /**
   * Label above the criteria
   */
  @Input() public label?: string;

  /**
   * Lowercase label
   */
  @Input() public lowerCase?: string;

  /**
   * Uppercase label
   */
  @Input() public upperCase?: string;

  /**
   * Special caracter label
   */
  @Input() public specialChar?: string;

  /**
   * Minimum length label
   */
  @Input() public minLength?: string;

  /**
   * Minimum length value
   */
  @Input() public minLengthValue: number = 0;

  /**
   * Event emitted on change. Wether password format is valid or not.
   */
  @Output() public passwordChecked: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  public hasLowerCase = /[a-z]/.test(this.password);
  public hasUpperCase = /[A-Z]/.test(this.password);
  public hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(this.password);
  public hasMinLength = this.password.length >= this.minLengthValue;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['password']) {
      this._onPasswordChange(changes['password'].currentValue);
    }
  }

  private _onPasswordChange(password: string): void {
    this.hasLowerCase = /[a-z]/.test(password);
    this.hasUpperCase = /[A-Z]/.test(password);
    this.hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    this.hasMinLength = password.length >= this.minLengthValue;
  }
}
