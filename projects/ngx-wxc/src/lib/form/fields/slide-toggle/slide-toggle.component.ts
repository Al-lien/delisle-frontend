import { AsyncPipe, KeyValuePipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { Observable } from 'rxjs';
import { ErrorTranslateService } from '../../../services';
import { ERROR_TRANSLATE_SERVICE_TOKEN } from '../../../tokens';

@Component({
  selector: 'ngx-wxc-slide-toggle',
  standalone: true,
  imports: [
    NgIf,
    MatInputModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    KeyValuePipe,
    AsyncPipe,
  ],
  templateUrl: './slide-toggle.component.html',
  styleUrl: './slide-toggle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxWxcSlideToggleComponent implements OnInit {
  @Input() public control!: FormControl;
  @Input() public label!: string | null;
  @Input() public labelPosition: 'after' | 'before' = 'after';
  @Input() public required: boolean = false;
  @Input() public errorPath?: string;
  @Output() public change!: EventEmitter<boolean>;

  constructor(
    @Inject(ERROR_TRANSLATE_SERVICE_TOKEN)
    private _errorTranslateService: ErrorTranslateService
  ) {}

  ngOnInit(): void {
    if (!this.control) {
      this.control = this.control || new FormControl();
    }
  }

  public onChange(change: MatSlideToggleChange): void {
    this.change.emit(change.checked);
  }

  public getError(errorKey: string): Observable<string | string[]> {
    return this._errorTranslateService.get(`${this.errorPath}.${errorKey}`);
  }
}
