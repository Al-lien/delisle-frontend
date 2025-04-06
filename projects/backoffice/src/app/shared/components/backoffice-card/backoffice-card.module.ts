import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BackofficeCardComponent } from './backoffice-card.component';

@NgModule({
  declarations: [BackofficeCardComponent],
  exports: [BackofficeCardComponent],
  imports: [CommonModule, MatCardModule],
})
export class BackofficeCardModule {}
