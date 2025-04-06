import { AsyncPipe, KeyValuePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  ViewChild,
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

export const InputTypeEnum = {
  text: 'text',
  email: 'email',
};

export type InputType = keyof typeof InputTypeEnum;

@Component({
  selector: 'ngx-wxc-input-text',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    KeyValuePipe,
    AsyncPipe,
  ],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss',
})
export class NgxWxcInputTextComponent implements OnInit {
  @ViewChild(MatInput) public input: MatInput | undefined;

  @Input() public ariaLabel!: string;
  @Input() public autocomplete = 'on';
  @Input() public control!: FormControl;
  @Input() public searchFieldVal?: string;
  @Input() public type: InputType = 'text';
  @Input() public label!: string;
  @Input() public floatLabel?: FloatLabelType;
  @Input() public placeholder!: string;
  @Input() public required: boolean = true;
  @Input() public errorPath?: string;
  @Input() public clearButton: boolean = false;
  @Input() public clearButtonTitle?: string;
  @Input() public matIcon: string = 'close';

  @Output() public textChange: EventEmitter<string> =
    new EventEmitter<string>();

  // ...

  constructor(
    @Inject(ERROR_TRANSLATE_SERVICE_TOKEN)
    private readonly _errorTranslateService: ErrorTranslateService
  ) {}

  ngOnInit(): void {
    if (!this.control) {
      this.control = new FormControl(this.searchFieldVal ?? null);
    }
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

  public clear(): void {
    this.control.setValue('');
    this.control.markAsDirty();
    this.onTextChange();
  }

  public focus(): void {
    if (this.input === null || this.input === undefined) {
      return;
    }
    this.input.focus();
  }
}
