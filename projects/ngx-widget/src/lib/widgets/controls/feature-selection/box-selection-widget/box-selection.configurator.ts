import { Fill, Stroke, Style } from 'ol/style';
import CircleStyle from 'ol/style/Circle';

export const selectedStyle = new Style({
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

export const DEFAULT_ANIMATION_DURATION = 750;
export const DEFAULT_PADDING = [170, 50, 170, 50];
