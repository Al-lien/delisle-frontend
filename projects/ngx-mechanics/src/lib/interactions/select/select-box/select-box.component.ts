import { Component } from '@angular/core';
import { Condition, shiftKeyOnly } from 'ol/events/condition';
import { Fill, Stroke } from 'ol/style';
import Style, { StyleLike } from 'ol/style/Style';
import { SelectTypeEnum } from '../../../models';
import { AbstractSelectComponent } from '../abstract-select.component';

@Component({
  selector: 'ngx-mechanics-select-box',
  template: '',
  standalone: true,
})
export class SelectBoxComponent extends AbstractSelectComponent {
  /**
   * Box selection style
   * @returns Stylelike OpenLayers object.
   */
  protected getSelectionstyle_(): StyleLike {
    return new Style({
      fill: new Fill({
        color: 'rgba(255, 255, 255, 0.6)',
      }),
      stroke: new Stroke({
        color: 'rgba(255, 255, 255, 0.7)',
        width: 2,
      }),
    });
  }

  /**
   * Can drag box only whent shift key pressed

   */
  protected getCondition_(): Condition {
    return shiftKeyOnly;
  }

  /**
   * Rectangle box selection type
   */
  protected getSelectType_(): SelectTypeEnum {
    return SelectTypeEnum.BOX;
  }
}
