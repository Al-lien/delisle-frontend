import { isNil, uniqueId } from 'lodash-es';
import { Map } from 'ol';
import { Draw } from 'ol/interaction';
import { DrawEvent } from 'ol/interaction/Draw';
import VectorLayer from 'ol/layer/Vector';
import { Vector } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import { StyleLike } from 'ol/style/Style';
import { Subject } from 'rxjs';
import {
  GEOM_TYPE,
  IInteraction,
  IInteractionOptions,
  InteractionTypeEnum,
} from '../../models';
import { IInteractionAction } from '../../services';

export interface IDrawInteraction extends IInteraction<Draw> {
  drawType: GEOM_TYPE;
  layer: VectorLayer;
}

export interface IDrawInteractionOptionsNGOL extends IInteractionOptions {
  drawType: GEOM_TYPE;
  layerOptions: VectorLayer;
  interactionStart: (evt: DrawEvent) => void;
  interactionEnd: (evt: DrawEvent) => void;
}

export interface IDrawInteractionOptions {
  drawType: GEOM_TYPE;
  id: string;
  interactionEnd: (evt: DrawEvent) => void;
  interactionStart: (evt: DrawEvent) => void;
  interactionType: InteractionTypeEnum;
  layerOptions: VectorLayer;
  olMap: Map;
  source: VectorSource;
  style: StyleLike;
  additionalOptions?: Record<string, unknown>;
}

export interface IDrawLayerOptions {
  id: string;
  name: string;
}

export class DrawInteraction {
  public activated: boolean;
  public changes: Subject<IInteractionAction>;
  public drawType!: GEOM_TYPE;
  public id!: string;
  public interactionType!: InteractionTypeEnum;
  public layer!: VectorLayer<Vector<any>, any>;
  public olInteraction: Draw | null;
  public olMap!: Map;
  public options!: IDrawInteractionOptions;
  public uid: string;

  constructor(options: IDrawInteractionOptions) {
    this.activated = false;
    this.changes = new Subject<IInteractionAction>();
    this.id = options.id;
    this.layer = options.layerOptions;
    this.olMap = options.olMap;
    this.olInteraction = null;
    this.options = options;
    this.uid = uniqueId(`${this.id}_`);
  }

  public activate(): void {
    this.activated = true;
    this.olMap.addLayer(this.layer);
    this._createInteraction();
    this.changes.next({ status: 'on', id: this.id });
  }

  public deactivate(): void {
    this.activated = false;
    this.olMap.removeLayer(this.layer);
    this._removeInteraction();
    this.changes.next({ status: 'off', id: this.id });
  }

  public update(options: IInteractionOptions): void {}

  private _createInteraction(): void {
    if (!isNil(this.olInteraction)) {
      this.olMap.removeInteraction(this.olInteraction);
      this.olInteraction = null;
    }

    const drawOptions = {
      source: this.options.source,
      type: this.options.drawType,
      style: this.options.style,
    };

    this.olInteraction = new Draw({
      ...drawOptions,
      ...this.options.additionalOptions,
    });

    if (!isNil(this.options.interactionStart)) {
      this.olInteraction.on('drawstart', (evt) =>
        this.options.interactionStart(evt)
      );
    }
    if (!isNil(this.options.interactionEnd)) {
      this.olInteraction.on('drawend', (evt) =>
        this.options.interactionEnd(evt)
      );
    }

    this.olMap.addInteraction(this.olInteraction);
  }

  private _removeInteraction(): void {
    if (!isNil(this.olInteraction)) {
      this.olMap.removeInteraction(this.olInteraction);
      this.olInteraction = null;
    }
  }
}
