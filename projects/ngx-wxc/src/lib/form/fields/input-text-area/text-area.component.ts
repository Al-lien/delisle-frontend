import { TextFieldModule } from '@angular/cdk/text-field';
import { AsyncPipe, CommonModule, KeyValuePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';
import { ErrorTranslateService } from '../../../services';
import { ERROR_TRANSLATE_SERVICE_TOKEN } from '../../../tokens';

@Component({
  selector: 'ngx-wxc-text-area',
  templateUrl: './text-area.component.html',
  styleUrl: './text-area.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    TextFieldModule,
    ReactiveFormsModule,
    KeyValuePipe,
    AsyncPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxWxcTextAreaComponent {
  @Input() public hint?: string;
  @Input() public minRows?: number;
  @Input() public maxRows?: number;
  @Input() public errorPath?: string;
  @Input() public placeholder!: string;
  @Input() public control!: FormControl;
  @Input() public autosize: boolean = true;
  @Input() public required: boolean = false;
  @Output() public change: EventEmitter<Event> = new EventEmitter<Event>();

  constructor(
    @Inject(ERROR_TRANSLATE_SERVICE_TOKEN)
    private _errorTranslateService: ErrorTranslateService
  ) {}

  ngOnInit(): void {
    this.control = this.control || new FormControl('');
  }

  public onChange(): void {
    this.change.emit(this.control.value);
  }

  public getError(errorKey: string): Observable<string | string[]> {
    return this._errorTranslateService.get(`${this.errorPath}.${errorKey}`);
  }
}
