import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  MatProgressBarModule,
  ProgressBarMode,
} from '@angular/material/progress-bar';

export interface IInterventionTimespan {
  daysPassed: number;
  daysLeft: number;
  remainingTimePercentage: number;
}

@Component({
  selector: 'ngx-wxc-progress-bar',
  standalone: true,
  imports: [MatProgressBarModule],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxWxcProgressBarComponent {
  /**
   * The progress value from 0 to 100.
   */
  @Input() public value!: number | undefined;

  /**
   * Label at the start of the bar.
   */
  @Input() public startLabel!: string | Date | null;

  /**
   * Label at the start of the bar.
   */
  @Input() public endLabel!: string | Date | null;

  /**
   * Mode of the progress bar.
   * {@link ProgressBarMode }
   */
  @Input() public mode: ProgressBarMode = 'determinate';
}
