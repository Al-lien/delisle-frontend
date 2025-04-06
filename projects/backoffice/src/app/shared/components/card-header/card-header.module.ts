import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { NgxWxcButtonSubmitComponent } from '@ngx-wxc';
import { CardHeaderComponent } from './card-header.component';

@NgModule({
  declarations: [CardHeaderComponent],
  exports: [CardHeaderComponent],
  imports: [
    CommonModule,
    MatCardModule,
    TranslateModule,
    NgxWxcButtonSubmitComponent,
  ],
})
export class CardHeaderModule {}
