import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';
import {
  NgxWxcButtonCancelComponent,
  NgxWxcButtonSubmitComponent,
  NgxWxcCardHeaderComponent,
  NgxWxcSearchBarComponent,
  NgxWxcStationCardComponentProvided,
} from '@ngx-wxc';
import { BackofficeCardModule } from '../../../shared/components/backoffice-card/backoffice-card.module';
import { CardHeaderModule } from '../../../shared/components/card-header/card-header.module';
import { InterventionFormModule } from '../intervention-form/intervention-form.module';
import { SnapshotPaginatorModule } from '../station-details/station-details.module';
import { StationReportCardModule } from '../station-report-card/station-report-card.module';
import { ReportComponent } from './report.component';

@NgModule({
  declarations: [ReportComponent],
  exports: [ReportComponent],
  imports: [
    CommonModule,
    StationReportCardModule,
    ScrollingModule,
    MatDividerModule,
    BackofficeCardModule,
    SnapshotPaginatorModule,
    TranslateModule,
    MatProgressSpinnerModule,
    CardHeaderModule,
    InterventionFormModule,
    ReactiveFormsModule,
    FormsModule,
    MatRippleModule,
    NgxWxcCardHeaderComponent,
    NgxWxcSearchBarComponent,
    NgxWxcButtonCancelComponent,
    NgxWxcButtonSubmitComponent,
    NgxWxcStationCardComponentProvided,
  ],
})
export class ReportModule {}
