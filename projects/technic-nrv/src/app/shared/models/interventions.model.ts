import { IncidentTypeEnum } from '@ngx-wxc';

export interface IIntervention {
  id: string;
  technician: ITechnician;
  station: IBikestation;
  problems: IncidentTypeEnum[];
  startsAt: Date;
  endsAt: Date;
  comment: string[];
  status: string[];
  timelapse: number;
}

export interface ITechnician {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  roles: string;
}

export interface IBikestation {
  id: string;
  address: string;
  name: string;
  lat: number;
  lng: number;
  commune: string;
}
