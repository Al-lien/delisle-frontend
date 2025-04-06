import { IPaginatedSnapshot } from './incident-snapshot.model';
import { IIncidentStat } from './incident-stat.model';

export interface IBikeStationSanitized {
  id: number;
  address: string;
  name: string;
  commune: string;
  lat?: number;
  lng?: number;
}

export interface IBIkeStationStat extends IBikeStationSanitized {
  totalReports: number;
  lastReport: Date;
  incidentStats: IIncidentStat[];
  incidentSnapshots: IPaginatedSnapshot[];
}

export interface IPaginatedResponse {
  content: IBIkeStationStat[];
  first: boolean;
  last: boolean;
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
