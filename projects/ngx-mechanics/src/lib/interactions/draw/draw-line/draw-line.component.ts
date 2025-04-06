import { Component, forwardRef } from '@angular/core';
import VectorLayer from 'ol/layer/Vector';
import { Fill, Stroke, Style } from 'ol/style';
import CircleStyle from 'ol/style/Circle';
import { StyleLike } from 'ol/style/Style';
import { GEOM_TYPE } from '../../../models';
import { AbstractDrawComponent } from '../abstract-draw.component';

// NOTE: VALUES FOR LENGTH MEASUREMENT DRAWING INTERACTION : UNIQUE CLASS
@Component({
  selector: 'ngx-mechanics-draw-line',
  template: '',
  standalone: true,
  providers: [
    {
      provide: AbstractDrawComponent,
      useExisting: forwardRef(() => DrawLineComponent),
    },
  ],
})
export class DrawLineComponent extends AbstractDrawComponent {
  protected getGeomType_(): GEOM_TYPE {
    return GEOM_TYPE.LineString;
  }
  protected getDrawingGeometryStyle_(): StyleLike {
    return new Style({
      stroke: new Stroke({
        color: '1c2e4230',
        lineDash: [10, 10],
        width: 3,
      }),
      image: new CircleStyle({
        radius: 5,
        stroke: new Stroke({
          color: '1c2e4250',
        }),
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
          width: 5,
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
