import { TIncidentType } from '../enums';

export interface IInterventionSanitized {
  technicianId: string;
  problems: TIncidentType[];
  startsAt: string;
  endsAt: string;
  comment: string[];
}
