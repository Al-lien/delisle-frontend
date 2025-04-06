import { IncidentTypeEnum } from '../enums';

export interface IIncidentTypeLabel {
  enum: IncidentTypeEnum;
  slug: string;
  // path to i18n file
  translatePath: string;
}

export interface IIncidentType {
  incident: boolean;
}
