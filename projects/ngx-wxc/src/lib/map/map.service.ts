import { Inject, Injectable } from '@angular/core';
import { Map, View } from 'ol';
import { MAP_CONFIG as MAP_CONFIG_TOKEN, MapConfig } from './map.token';

@Injectable({
  providedIn: 'root',
})
export class NgxWxcMapService {
  constructor(@Inject(MAP_CONFIG_TOKEN) private readonly config: MapConfig) {}

  public createMap(): Map {
    return new Map({
      controls: [],
      view: new View(this.config.view),
      layers: [this.config.layers],
      target: 'ol-map',
    });
  }
}
