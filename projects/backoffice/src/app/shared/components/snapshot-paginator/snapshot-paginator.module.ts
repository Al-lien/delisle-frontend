import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SnapshotCardModule } from '../snapshot-card/snapshot-card.module';
import { SnapshotPaginator } from './snapshot-paginator.component';

@NgModule({
  declarations: [SnapshotPaginator],
  exports: [SnapshotPaginator],
  imports: [CommonModule, SnapshotCardModule, MatPaginatorModule],
})
export class StationSnapshotModule {}
