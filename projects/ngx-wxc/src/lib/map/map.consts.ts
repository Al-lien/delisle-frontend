import { View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';
import { Fill, Stroke, Style } from 'ol/style';
import CircleStyle from 'ol/style/Circle';
import { MapConfig } from './map.token';

export const view = new View({
  center: [0, 0],
  zoom: 1,
});

export const layer = new TileLayer({
  source: new OSM(),
});

export const mapConfig: MapConfig = {
  view: view,
  layers: layer,
};

export const markerStyle = new Style({
  image: new CircleStyle({
    radius: 8,
    fill: new Fill({
      color: '#e20612', // Theme accent color
    }),
    stroke: new Stroke({
      color: '#fcfcfd', // White border
      width: 3,
    }),
  }),
});
