import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TruncatePipe } from '@ngx-wxc';
import { SnapshotCardComponent } from './snapshot-card.component';

@NgModule({
  declarations: [SnapshotCardComponent],
  exports: [SnapshotCardComponent],
  imports: [CommonModule, MatCardModule, MatTooltipModule, TruncatePipe],
})
export class SnapshotCardModule {}
