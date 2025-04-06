import { Injectable } from '@angular/core';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { XYZ } from 'ol/source';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  public createMap(): Map {
    return new Map({
      controls: [],
      view: new View(environment.map.config.view),
      layers: [
        new TileLayer({
          source: new XYZ({
            url: `https://tile.thunderforest.com/${environment.map.thunderforest.baseLayer}/{z}/{x}/{y}.png?apikey=${environment.map.thunderforest.apiKey}`,
          }),
        }),
      ],
      target: 'ol-map',
    });
  }
}
