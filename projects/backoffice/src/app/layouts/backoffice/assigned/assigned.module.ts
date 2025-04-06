import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';
import {
  DIALOG_COMPONENT_TOKEN,
  NgxWxcConfirmDialogComponent,
  NgxWxcSearchBarComponent,
} from '@ngx-wxc';
import { NgxWxcCardHeaderComponent } from '../../../../../../ngx-wxc/src/lib/components/card-header/card-header.component';
import { BackofficeCardModule } from '../../../shared/components/backoffice-card/backoffice-card.module';
import { CardHeaderModule } from '../../../shared/components/card-header/card-header.module';
import { InterventionDetailsModule } from '../intervention-details/intervention-details.module';
import { StationReportCardModule } from '../station-report-card/station-report-card.module';
import { AssignedComponent } from './assigned.component';

@NgModule({
  declarations: [AssignedComponent],
  exports: [AssignedComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    TranslateModule,
    MatDividerModule,
    BackofficeCardModule,
    InterventionDetailsModule,
    MatProgressSpinnerModule,
    ScrollingModule,
    StationReportCardModule,
    CardHeaderModule,
    NgxWxcSearchBarComponent,
    NgxWxcCardHeaderComponent,
  ],
  providers: [
    {
      provide: DIALOG_COMPONENT_TOKEN,
      useValue: NgxWxcConfirmDialogComponent,
    },
  ],
})
export class AssignedModule {}
