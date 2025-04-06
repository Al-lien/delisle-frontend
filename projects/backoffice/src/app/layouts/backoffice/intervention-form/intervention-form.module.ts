import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import {
  NgxWxcDatePickerComponent,
  NgxWxcSelectComponent,
  NgxWxcTextAreaComponent,
  NgxWxcToggleGroupComponent,
} from '@ngx-wxc';
import { ToggleGroupModule } from '../../../features/toggle-group/toggle-group.module';
import { InterventionFormComponent } from './intervention-form.component';

@NgModule({
  declarations: [InterventionFormComponent],
  exports: [InterventionFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    ToggleGroupModule,
    MatFormFieldModule,
    MatIconModule,
    MatTooltipModule,
    NgxWxcTextAreaComponent,
    NgxWxcSelectComponent,
    NgxWxcDatePickerComponent,
    NgxWxcToggleGroupComponent,
  ],
})
export class InterventionFormModule {}
