import { Component, forwardRef } from '@angular/core';
import VectorLayer from 'ol/layer/Vector';
import { Fill, Stroke, Style } from 'ol/style';
import CircleStyle from 'ol/style/Circle';
import { StyleLike } from 'ol/style/Style';
import { GEOM_TYPE } from '../../../models';
import { AbstractDrawComponent } from '../abstract-draw.component';

// NOTE: VALUES FOR AREA MEASUREMENT DRAWING INTERACTION : UNIQUE CLASS
@Component({
  selector: 'ngx-mechanics-draw-area',
  template: '',
  standalone: true,
  providers: [
    {
      provide: AbstractDrawComponent,
      useExisting: forwardRef(() => DrawAreaComponent),
    },
  ],
})
export class DrawAreaComponent extends AbstractDrawComponent {
  protected getGeomType_(): GEOM_TYPE {
    return GEOM_TYPE.Polygon;
  }
  protected getDrawingGeometryStyle_(): StyleLike {
    return new Style({
      // style of polygon background color during drawing
      fill: new Fill({
        color: '#fcfcfd80',
      }),
      // style of mesure line during drawing
      stroke: new Stroke({
        color: '1c2e4230',
        lineDash: [5, 15],
        width: 3,
      }),
      // style of pointer
      image: new CircleStyle({
        radius: 5,
        stroke: new Stroke({
          color: '#1c2e42',
        }),
        // style of pointer background
        fill: new Fill({
          color: '#fcfcfd20',
        }),
      }),
    });
  }
  protected getEndedGeometryLayerStyle_(): VectorLayer {
    return new VectorLayer({
      source: this.measureSource,
      style: new Style({
        stroke: new Stroke({
          color: '#e20612',
          width: 3,
        }),
        fill: new Fill({
          color: '#fcfcfd80',
        }),
      }),
    });
  }
  protected getAdditionnalOptions_(): Record<string, unknown> {
    return {
      stopClick: true,
    };
  }
}
