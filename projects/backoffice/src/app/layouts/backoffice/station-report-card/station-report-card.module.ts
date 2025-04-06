import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { StationCardComponent } from './station-report-card.component';

@NgModule({
  declarations: [StationCardComponent],
  exports: [StationCardComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    DatePipe,
  ],
})
export class StationReportCardModule {}
