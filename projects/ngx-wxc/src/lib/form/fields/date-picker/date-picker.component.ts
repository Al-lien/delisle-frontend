import {
  AsyncPipe,
  DATE_PIPE_DEFAULT_OPTIONS,
  KeyValuePipe,
  NgIf,
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  EventEmitter,
  inject,
  Inject,
  Input,
  OnInit,
  Output,
  Signal,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Observable } from 'rxjs';
import { LanguageService } from '../../../core';
import { ErrorTranslateService } from '../../../services';
import {
  ERROR_TRANSLATE_SERVICE_TOKEN,
  LANGUAGE_SERVICE_TOKEN,
} from '../../../tokens';

export const DateFormatEnum = {
  YYYY_MM_DD: 'YYYY/MM/DD',
  DD_MM_YYYY: 'DD/MM/YYYY',
};

/**
 * This creates a union of the enum values.
 */
export type DateFormat = (typeof DateFormatEnum)[keyof typeof DateFormatEnum];
@Component({
  selector: 'ngx-wxc-date-picker',
  standalone: true,
  imports: [
    NgIf,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    KeyValuePipe,
    AsyncPipe,
  ],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: { dateFormat: 'mediumDate' },
    },
  ],
})
export class NgxWxcDatePickerComponent implements OnInit {
  @Input() public group!: FormGroup;
  @Input() public endLabel!: string;
  @Input() public applyBtn!: string;
  @Input() public errorPath?: string;
  @Input() public cancelBtn!: string;
  @Input() public mainlabel?: string;
  @Input() public startLabel!: string;
  @Input() public opened: boolean = false;
  @Input() public required: boolean = false;
  @Input() public dateFormat?: boolean = true;
  @Input() public maxDate: null | Date = null;
  @Input() public minDate: null | Date = new Date();
  @Output() public closed: EventEmitter<string> = new EventEmitter<string>();

  public readonly dateFormatString: Signal<DateFormat> = computed(() => {
    if (this._languageService.getLocale() === 'en-EN') {
      return DateFormatEnum.YYYY_MM_DD;
    } else if (this._languageService.getLocale() === 'fr-FR') {
      return DateFormatEnum.DD_MM_YYYY;
    }
    return DateFormatEnum.YYYY_MM_DD;
  });

  private readonly _adapter =
    inject<DateAdapter<unknown, unknown>>(DateAdapter);

  constructor(
    @Inject(ERROR_TRANSLATE_SERVICE_TOKEN)
    private readonly _errorTranslateService: ErrorTranslateService,
    @Inject(LANGUAGE_SERVICE_TOKEN)
    private readonly _languageService: LanguageService
  ) {}

  ngOnInit(): void {
    if (!this.group) {
      this.group =
        this.group ||
        new FormGroup({
          startsAt: new FormControl(new Date()),
          endsAt: new FormControl(new Date()),
        });
    }

    this._adapter.setLocale(this._languageService.getLocale());
  }

  public getError(errorKey: string): Observable<string | string[]> {
    return this._errorTranslateService.get(`${this.errorPath}.${errorKey}`);
  }
}
