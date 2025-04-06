import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WaitingForValidationComponent } from './waiting-for-validation.component';

@NgModule({
  declarations: [WaitingForValidationComponent],
  exports: [WaitingForValidationComponent],
  imports: [CommonModule],
})
export class WaitingForValidationModule {}
