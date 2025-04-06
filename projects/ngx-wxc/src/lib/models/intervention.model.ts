import { IncidentTypeEnum } from '../enums';

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

export interface IStationIntervention {
  technician: string;
  timelapse: ITimelapse;
  operations: IStationOperation[];
  description: string;
}

export interface ITimelapse {
  startsAt: Date;
  endsAt: Date;
}

export interface IStationOperation {
  operation: Date;
  isSelected: boolean;
}

export enum InterventionStatusEnum {
  REPORTED,
  ASSIGNED,
  ARCHIVED,
  WAITING_FOR_VALIDATION,
}

export type TInterventionStatus = keyof typeof InterventionStatusEnum;
