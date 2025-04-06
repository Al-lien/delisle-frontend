import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';

export const defaultStyle = new Style({
  image: new CircleStyle({
    radius: 6,
    fill: new Fill({
      color: '#415971', // Theme primary color
    }),
    stroke: new Stroke({
      color: '#fcfcfd', // White border
      width: 2,
    }),
  }),
});

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
