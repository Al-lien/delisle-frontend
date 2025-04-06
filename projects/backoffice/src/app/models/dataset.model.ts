import { TIncidentType } from '@ngx-wxc';
import { ChartType } from 'chart.js';

export interface IData {
  x: TIncidentType;
  y: number;
}

export interface IDataset {
  [key: string]: unknown;
  type: ChartType;
  label: string;
  backgroundColor: string;
  barThickness: number;
  data: IData[] | undefined;
}
