import { InjectionToken } from '@angular/core';

export interface MapConfig {
  view: any;
  layers?: any;
}

export const MAP_CONFIG = new InjectionToken<MapConfig>('MAP_CONFIG');
