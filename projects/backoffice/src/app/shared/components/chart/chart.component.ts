import {
  Component,
  effect,
  Input,
  OnInit,
  WritableSignal,
} from '@angular/core';
import { Chart, ChartOptions } from 'chart.js';
import { IDataset } from '../../../models/dataset.model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
  host: {
    class: 'chart-container',
  },
})
export class ChartComponent<T> implements OnInit {
  @Input() public selectedItem$!: WritableSignal<T | undefined>;
  @Input() public chartOptions!: ChartOptions;
  @Input() public datasets!: (item: T | undefined) => IDataset[];
  public chart!: any;

  constructor() {
    effect(() => {
      const newDatasets: IDataset[] = this.datasets(this.selectedItem$());

      this._updateDatasets(newDatasets);
    });
  }

  ngOnInit(): void {
    if (!this.selectedItem$ || !this.datasets || !this.chartOptions) {
      console.error('Missing required inputs for chart rendering');
      return;
    }

    this._createChart();
  }

  private _updateDatasets(newDatasets: IDataset[]): void {
    const currentDatasets = this.chart.data.datasets;

    while (currentDatasets.length > 0) {
      currentDatasets.pop();
    }

    currentDatasets.push(...newDatasets);

    this.chart.update();
  }

  private _createChart(): void {
    this.chart = new Chart('MyChart', {
      type: 'bar',
      data: {
        datasets: [],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        ...this.chartOptions,
      },
    });
  }
}
