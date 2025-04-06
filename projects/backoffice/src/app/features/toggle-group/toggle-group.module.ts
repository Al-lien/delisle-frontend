import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgxWxcSlideToggleComponent } from '@ngx-wxc';
import { ToggleGroupComponent } from './toggle-group.component';

@NgModule({
  declarations: [ToggleGroupComponent],
  exports: [ToggleGroupComponent],
  imports: [
    CommonModule,
    NgxWxcSlideToggleComponent,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
  ],
})
export class ToggleGroupModule {}
