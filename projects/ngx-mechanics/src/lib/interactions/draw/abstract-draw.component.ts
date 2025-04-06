import { Component, OnInit } from '@angular/core';
import { isNil } from 'lodash-es';
import { DrawEvent } from 'ol/interaction/Draw';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { StyleLike } from 'ol/style/Style';
import { GEOM_TYPE, InteractionTypeEnum } from '../../models';
import { InteractionService } from '../../services';
import { SharedDataService } from '../../services/shared-data.service';
import { AbstractInteractionComponent } from '../abstract-interaction.component';
import { IDrawInteractionOptions } from './draw.interaction';

@Component({
  selector: 'ngx-mechanics-draw[id][map]',
  template: '',
})
export abstract class AbstractDrawComponent
  extends AbstractInteractionComponent<DrawEvent>
  implements OnInit
{
  protected measureSource: VectorSource;

  constructor(
    _interactionService: InteractionService,
    _sharedDataService: SharedDataService
  ) {
    super(_interactionService, _sharedDataService);
    this.measureSource = new VectorSource();
  }

  protected getInteractionOptions_(): IDrawInteractionOptions {
    return {
      id: this.id,
      olMap: this.olMap,
      interactionStart: (evt) => this.onInteractionStart(evt),
      interactionEnd: (evt) => this.onInteractionEnd(evt),
      drawType: this.getGeomType_(),
      style: this.getDrawingGeometryStyle_(),
      layerOptions: this.getEndedGeometryLayerStyle_(),
      interactionType: InteractionTypeEnum.DRAW,
      source: this.measureSource,
      additionalOptions: this.getAdditionnalOptions_(),
    };
  }

  protected onInteractionStart(evt: DrawEvent): void {
    if (!isNil(this.getInteractionOptions_().source)) {
      this.getInteractionOptions_().source.clear();
    }
    this.interactionStart.emit(evt);
  }

  protected onInteractionEnd(evt: DrawEvent): void {
    this.interactionEnd.emit(evt);
  }

  protected abstract getGeomType_(): GEOM_TYPE;
  protected abstract getDrawingGeometryStyle_(): StyleLike;
  protected abstract getEndedGeometryLayerStyle_(): VectorLayer;
  protected abstract getAdditionnalOptions_(): Record<string, unknown>;
}
