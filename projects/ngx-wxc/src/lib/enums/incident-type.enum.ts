export enum IncidentTypeEnum {
  FLAT_TIRE = 'flat-tire',
  BRAKES_MALFUNCTION = 'brakes-malfunction',
  SADDLE_MALFUNCTION = 'saddle-malfunction',
  SADDLE_MISSING = 'saddle-missing',
  BATTERY_MALFUNCTION = 'battery-malfunction',
  CHAIN_MALFUNCTION = 'chain-malfunction',
  HANDLEBAR_MALFUNCTION = 'handlebar-malfunction',
  LIGHTS_MALFUNCTION = 'lights-malfunction',
  BIKE_LOCK_MALFUNCTION = 'bike-lock-malfunction',
  BIKE_LOCK_MISSING = 'bike-lock-missing',
  CONNEXION_ERROR = 'connexion-error',
  PAIMENT_ERROR = 'paiment-error',
  SCREEN_MALFUNCTION = 'screen-malfunction',
  STAND_VANDALISM = 'stand-vandalism',
  STAND_LOCK_MALFUNCTION = 'stand-lock-malfunction',
  BIKE_VANDALISM = 'bike-vandalism',
}

export type TIncidentType = keyof typeof IncidentTypeEnum;
