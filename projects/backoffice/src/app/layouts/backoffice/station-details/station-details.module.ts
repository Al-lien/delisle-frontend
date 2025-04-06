import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ChartModule } from '../../../shared/components/chart/chart.module';
import { StationSnapshotModule } from '../../../shared/components/snapshot-paginator/snapshot-paginator.module';
import { MapModule } from '../../../shared/map/map.module';
import { StationDetailsComponent } from './station-details.component';

@NgModule({
  declarations: [StationDetailsComponent],
  exports: [StationDetailsComponent],
  imports: [
    CommonModule,
    ChartModule,
    TranslateModule,
    StationSnapshotModule,
    MapModule,
  ],
})
export class SnapshotPaginatorModule {}
