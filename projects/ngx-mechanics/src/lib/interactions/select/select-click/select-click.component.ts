import { Component } from '@angular/core';
import { click, Condition } from 'ol/events/condition';
import { Fill, Stroke } from 'ol/style';
import CircleStyle from 'ol/style/Circle';
import Style, { StyleLike } from 'ol/style/Style';
import { SelectTypeEnum } from '../../../models';
import { AbstractSelectComponent } from '../abstract-select.component';

@Component({
  selector: 'ngx-mechanics-select-click',
  template: '',
  standalone: true,
})
export class SelectClickComponent extends AbstractSelectComponent {
  protected getSelectionstyle_(): StyleLike {
    return new Style({
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
  }

  protected getCondition_(): Condition {
    return click;
  }

  protected getSelectType_(): SelectTypeEnum {
    return SelectTypeEnum.CLICK;
  }
}
