import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IPaginatedSnapshot } from '@ngx-wxc';

@Component({
  selector: 'app-snapshot-card',
  templateUrl: './snapshot-card.component.html',
  styleUrl: './snapshot-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnapshotCardComponent {
  @Input() public snapshot!: IPaginatedSnapshot;
}
