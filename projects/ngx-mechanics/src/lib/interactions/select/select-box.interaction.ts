import { isNil, uniqueId } from 'lodash-es';
import { Map } from 'ol';
import { DragBox } from 'ol/interaction';
import { Subject } from 'rxjs';
import {
  IInteractionOptions,
  InteractionTypeEnum,
  SelectTypeEnum,
} from '../../models';
import { IInteractionAction } from '../../services';
import { ISelectInteractionOption } from './abstract-select.component';

export class SelectBoxInteraction {
  public activated: boolean;
  public changes: Subject<IInteractionAction>;
  public selectType!: SelectTypeEnum;
  public id!: string;
  public interactionType!: InteractionTypeEnum;
  public olInteraction: DragBox | null;
  public olMap!: Map;
  public options: ISelectInteractionOption;
  public uid: string;

  constructor(options: ISelectInteractionOption) {
    this.activated = false;
    this.changes = new Subject<IInteractionAction>();
    this.id = options.id;
    this.olMap = options.olMap;
    this.olInteraction = null;
    this.options = options;
    this.uid = uniqueId(`${this.id}_`);
  }

  public activate(): void {
    this.activated = true;
    this._createInteraction();
    this.changes.next({ status: 'on', id: this.id });
  }

  public deactivate(): void {
    this.activated = false;
    this._removeInteraction();
    this.changes.next({ status: 'off', id: this.id });
  }

  public update(options: IInteractionOptions): void {}

  private _createInteraction(): void {
    if (!isNil(this.olInteraction)) {
      this.olMap.removeInteraction(this.olInteraction);
      this.olInteraction = null;
    }

    this.olInteraction = new DragBox({
      condition: this.options.conditions, // Activates only when Shift key is held
      className: 'ol-dragbox',
    });

    if (!isNil(this.options.interactionStart)) {
      this.olInteraction.on('boxstart', (evt) =>
        this.options.interactionStart(evt)
      );
    }

    if (!isNil(this.options.interactionEnd)) {
      this.olInteraction.on('boxend', (evt) =>
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
