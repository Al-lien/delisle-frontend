import { IncidentTypeEnum } from '../enums';
import { IIncidentTypeLabel } from '../models';

export const incidentTypes: IIncidentTypeLabel[] = [
  {
    enum: IncidentTypeEnum.FLAT_TIRE,
    slug: 'flat_tire',
    translatePath: 'incident-types.flat-tire',
  },
  {
    enum: IncidentTypeEnum.BRAKES_MALFUNCTION,
    slug: 'brakes_malfunction',
    translatePath: 'incident-types.brakes-malfunction',
  },
  {
    enum: IncidentTypeEnum.SADDLE_MALFUNCTION,
    slug: 'saddle_malfunction',
    translatePath: 'incident-types.saddle-malfunction',
  },
  {
    enum: IncidentTypeEnum.SADDLE_MISSING,
    slug: 'saddle_missing',
    translatePath: 'incident-types.saddle-missing',
  },
  {
    enum: IncidentTypeEnum.BATTERY_MALFUNCTION,
    slug: 'battery_malfunction',
    translatePath: 'incident-types.battery-malfunction',
  },
  {
    enum: IncidentTypeEnum.CHAIN_MALFUNCTION,
    slug: 'chain_malfunction',
    translatePath: 'incident-types.chain-malfunction',
  },
  {
    enum: IncidentTypeEnum.HANDLEBAR_MALFUNCTION,
    slug: 'handlebar_malfunction',
    translatePath: 'incident-types.handlebar-malfunction',
  },
  {
    enum: IncidentTypeEnum.LIGHTS_MALFUNCTION,
    slug: 'lights_malfunction',
    translatePath: 'incident-types.lights-malfunction',
  },
  {
    enum: IncidentTypeEnum.BIKE_LOCK_MALFUNCTION,
    slug: 'bike_lock_malfunction',
    translatePath: 'incident-types.bike-lock-malfunction',
  },
  {
    enum: IncidentTypeEnum.BIKE_LOCK_MISSING,
    slug: 'bike_lock_missing',
    translatePath: 'incident-types.bike-lock-missing',
  },
  {
    enum: IncidentTypeEnum.CONNEXION_ERROR,
    slug: 'connexion_error',
    translatePath: 'incident-types.connexion-error',
  },
  {
    enum: IncidentTypeEnum.PAIMENT_ERROR,
    slug: 'paiment_error',
    translatePath: 'incident-types.paiment-error',
  },
  {
    enum: IncidentTypeEnum.SCREEN_MALFUNCTION,
    slug: 'screen_malfunction',
    translatePath: 'incident-types.screen-malfunction',
  },
  {
    enum: IncidentTypeEnum.STAND_VANDALISM,
    slug: 'stand_vandalism',
    translatePath: 'incident-types.stand-vandalism',
  },
  {
    enum: IncidentTypeEnum.STAND_LOCK_MALFUNCTION,
    slug: 'stand_lock_malfunction',
    translatePath: 'incident-types.stand-lock-malfunction',
  },
  {
    enum: IncidentTypeEnum.BIKE_VANDALISM,
    slug: 'bike_vandalism',
    translatePath: 'incident-types.bike-vandalism',
  },
];

export class IncidentTypeTransformer {
  public static transformIncidentTypeLabel(incidentTypeEnum: string): string {
    const incident = incidentTypes.find((item) => {
      return (
        item.slug.toLowerCase() === incidentTypeEnum.toString().toLowerCase()
      );
    });
    return incident ? incident.translatePath : 'undefined';
  }
}
