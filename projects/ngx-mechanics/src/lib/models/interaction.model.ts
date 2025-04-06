import { Map } from 'ol';
import VectorSource from 'ol/source/Vector';
import { StyleLike } from 'ol/style/Style';
import { Subject } from 'rxjs';
import { IInteractionAction } from '../services';

export enum InteractionTypeEnum {
  DRAW,
  SELECT,
}

export enum SelectTypeEnum {
  CLICK,
  BOX,
}

export interface IInteraction<
  S = unknown,
  T extends IInteractionOptions = IInteractionOptions
> {
  activated: boolean;
  changes: Subject<IInteractionAction>;
  id: string;
  interactionType: InteractionTypeEnum;
  olInteraction?: S | null;
  olMap: Map;
  activate(): void;
  deactivate(): void;
  update(options: T): void;
}

export interface IInteractionOptions {
  id: string;
  interactionType: InteractionTypeEnum;
  olMap: Map;
  source: VectorSource;
  style: StyleLike;
}

export enum GEOM_TYPE {
  LineString = 'LineString',
  Polygon = 'Polygon',
}

export type GeomType = keyof typeof GEOM_TYPE;

export interface IInteractionStyle {
  key: Record<string, unknown>;
  image: {
    key: Record<string, unknown>;
    radius: number;
  };
  stroke: {
    color: string;
    lineDash?: [number, number];
    width: number;
  };
}
