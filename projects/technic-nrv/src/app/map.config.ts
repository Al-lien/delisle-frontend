import { MapConfig } from '@ngx-wxc';
import TileLayer from 'ol/layer/Tile';
import { XYZ } from 'ol/source';
import { environment } from '../../../backoffice/src/environments/environment';

export const mapConfig: MapConfig = {
  view: {
    // TODO: change map projection (EPSG:2154 - Lambert 93)
    projection: 'EPSG:4326',
    center: [0, 0],
    zoom: 13.5,
    maxZoom: 18,
    minZoom: 13.5,
    extent: [4.778531, 45.697863, 4.98117413078694, 45.876622],
  },
  layers: new TileLayer({
    source: new XYZ({
      url: `https://tile.thunderforest.com/${environment.map.thunderforest.baseLayer}/{z}/{x}/{y}.png?apikey=${environment.map.thunderforest.apiKey}`,
    }),
  }),
};
