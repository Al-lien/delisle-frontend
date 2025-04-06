import { AsyncPipe, KeyValuePipe, NgIf } from '@angular/common';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { isNil } from 'lodash-es';
import { Observable } from 'rxjs';
import { ErrorTranslateService } from '../../../services';
import { ERROR_TRANSLATE_SERVICE_TOKEN } from '../../../tokens';

@Component({
  selector: 'ngx-wxc-select',
  standalone: true,
  imports: [
    NgIf,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule,
    AsyncPipe,
    KeyValuePipe,
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class NgxWxcSelectComponent {
  /**
   * `unknown` is used because the select does not require a specific interface
   * and we don't want to add this constraint
   */

  /**
   * The values on which the select component iterates.
   */
  @Input() public values!: unknown[];
  @Input() public label!: string;

  /**
   * Material icon key displayed in the field.
   */
  @Input() public matIcon?: string;

  /**
   * Key path to i18n.
   */
  @Input() public errorPath?: string;

  /**
   * Placeholder of the field
   */
  @Input() public placeholder!: string;

  /**
   * The form control used in the form field.
   */
  @Input() public control!: FormControl;

  /**
   * The key in the object provided (see above : `values`) whose value while be displayed as option.
   */
  @Input() public attributeDisplay?: string;
  @Input() public required: boolean = false;

  @Output() public selectionChange: EventEmitter<unknown> =
    new EventEmitter<unknown>();

  constructor(
    @Inject(ERROR_TRANSLATE_SERVICE_TOKEN)
    private readonly _errorTranslateService: ErrorTranslateService
  ) {}

  ngOnInit(): void {
    if (!this.control) {
      this.control = this.control || new FormControl();
    }
  }

  public onSelectionChange(): void {
    this.selectionChange.emit(this.control.value);
  }

  public displayListValue(value: any): unknown {
    return this.attributeDisplay ? value[this.attributeDisplay] : value;
  }

  public displayControlValue(): string {
    if (isNil(this.control.value)) {
      return '';
    }

    return this.attributeDisplay
      ? this.control.value[this.attributeDisplay]
      : this.control.value;
  }

  public getError(errorKey: string): Observable<string | string[]> {
    return this._errorTranslateService.get(`${this.errorPath}.${errorKey}`);
  }
}
