import { Component } from '@angular/core';
import { Map } from 'ol';
import { Condition } from 'ol/events/condition';

import BaseEvent from 'ol/events/Event';
import { DragBoxEvent } from 'ol/interaction/DragBox';
import { StyleLike } from 'ol/style/Style';
import { InteractionTypeEnum, SelectTypeEnum } from '../../models';
import { AbstractInteractionComponent } from '../abstract-interaction.component';

export interface ISelectInteractionOption {
  id: string;
  conditions: Condition;
  interactionEnd: (evt: BaseEvent) => void;
  interactionStart: (evt: BaseEvent) => void;
  interactionType: InteractionTypeEnum;
  olMap: Map;
  selectType: SelectTypeEnum;
  style: StyleLike;
}

@Component({
  selector: 'ngx-mechanics-select[id][map]',
  template: '',
})
export abstract class AbstractSelectComponent extends AbstractInteractionComponent<
  BaseEvent | DragBoxEvent
> {
  protected getInteractionOptions_(): ISelectInteractionOption {
    return {
      id: this.id,
      olMap: this.olMap,
      interactionStart: (evt) => this.onInteractionStart(evt),
      interactionEnd: (evt) => this.onInteractionEnd(evt),
      style: this.getSelectionstyle_(),
      interactionType: InteractionTypeEnum.SELECT,
      selectType: this.getSelectType_(),
      conditions: this.getCondition_(),
    };
  }

  protected onInteractionStart(evt: BaseEvent | DragBoxEvent): void {
    this.interactionStart.emit(evt);
  }
  protected onInteractionEnd(evt: BaseEvent | DragBoxEvent): void {
    this.interactionEnd.emit(evt);
  }

  protected abstract getSelectionstyle_(): StyleLike;
  protected abstract getCondition_(): Condition;
  protected abstract getSelectType_(): SelectTypeEnum;
}
