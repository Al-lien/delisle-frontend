import { Injectable } from '@angular/core';
import { isNil } from 'lodash-es';
import { getUid } from 'ol';
import {
  DrawInteraction,
  IDrawInteractionOptions,
  ISelectInteractionOption,
} from '../interactions';
import { SelectBoxInteraction } from '../interactions/select/select-box.interaction';
import { SelectClickInteraction } from '../interactions/select/select-click.interaction';
import {
  IInteraction,
  IInteractionOptions,
  InteractionTypeEnum,
  SelectTypeEnum,
} from '../models/interaction.model';

@Injectable({
  providedIn: 'root',
})
export class InteractionManager {
  public readonly registeredInteractionsByMap: Map<
    string,
    Map<string, IInteraction>
  >;

  constructor() {
    this.registeredInteractionsByMap = new Map<
      string,
      Map<string, IInteraction>
    >();
  }

  public provide<T>(
    options: IDrawInteractionOptions | ISelectInteractionOption
  ): T {
    const olMapUid = getUid(options.olMap);

    // checks if interaction already exists. If yes, returns interaction from array.
    if (this._hasInteraction(olMapUid, options.id)) {
      return this._getInteractionById(olMapUid, options.id) as T;
    }

    if (!this.registeredInteractionsByMap.has(olMapUid)) {
      this.registeredInteractionsByMap.set(
        olMapUid,
        new Map<string, IInteraction>()
      );
    }

    const interaction: any = this._createInteraction(options);
    this.registeredInteractionsByMap
      .get(olMapUid)!
      .set(interaction.id, interaction);

    return interaction as T;
  }

  public delete(olMapUid: string, interactionId: string): void {
    const interaction: IInteraction = this._getInteractionById(
      olMapUid,
      interactionId
    ) as IInteraction<unknown, IInteractionOptions>;

    if (isNil(interaction)) {
      console.warn('delete interaction failed');
      return;
    }

    if (interaction.activated) {
      interaction.deactivate();
    }

    this.registeredInteractionsByMap.get(olMapUid)?.delete(interactionId);
  }

  public activate(olMapUid: string, interactionId: string): void {
    const interaction: IInteraction = this._getInteractionById(
      olMapUid,
      interactionId
    ) as IInteraction<unknown, IInteractionOptions>;

    if (isNil(interaction)) {
      console.warn('activate interaction failed');
      return;
    }

    if (!interaction.activated) {
      this.deactivateAll(olMapUid);
      interaction.activate();
    }
  }

  public deactivate(olMapUid: string, interactionId: string): void {
    const interaction: IInteraction = this._getInteractionById(
      olMapUid,
      interactionId
    ) as IInteraction<unknown, IInteractionOptions>;

    if (isNil(interaction)) {
      console.warn('deactivate interaction failed');
      return;
    }

    if (interaction.activated) {
      interaction.deactivate();
    }
  }

  public deactivateAll(olMapUid: string): void {
    if (!this.registeredInteractionsByMap.has(olMapUid)) {
      console.warn('deactivateAll interaction failed');
      return;
    }

    for (const interaction of this.registeredInteractionsByMap
      .get(olMapUid)!
      .values()) {
      if (interaction.activated) {
        interaction.deactivate();
        interaction.activated = false;
      }
    }
  }

  public update<T extends IInteractionOptions>(
    olMapUid: string,
    interactionId: string,
    options: T
  ): void {
    const interaction: IInteraction = this._getInteractionById(
      olMapUid,
      interactionId
    ) as IInteraction<unknown, IInteractionOptions>;

    if (!this.registeredInteractionsByMap.has(olMapUid)) {
      console.warn('update interaction failed');
      return;
    }

    interaction.update(options);
  }

  private _createInteraction(
    options: IInteractionOptions | ISelectInteractionOption
  ): IInteraction {
    switch (options.interactionType) {
      /* DRAWING INTERACTION  */
      case InteractionTypeEnum.DRAW:
        return new DrawInteraction(options as IDrawInteractionOptions);
      /* SELECT INTERACTION */
      case InteractionTypeEnum.SELECT:
        switch ((options as ISelectInteractionOption).selectType) {
          /* CLICK SELECT */
          case SelectTypeEnum.CLICK:
            return new SelectClickInteraction(
              options as ISelectInteractionOption
            );
          /* BOX SELECT */
          case SelectTypeEnum.BOX:
            return new SelectBoxInteraction(
              options as ISelectInteractionOption
            );
          default:
            return {} as IInteraction;
        }
      default:
        return {} as IInteraction;
    }
  }

  private _hasInteraction(olMapUid: string, interactionId: string): boolean {
    return (
      this.registeredInteractionsByMap.has(olMapUid) &&
      this.registeredInteractionsByMap.get(olMapUid)!.has(interactionId)
    );
  }

  private _getInteractionById(
    olMapUid: string,
    interactionId: string
  ): IInteraction | null {
    if (!this._hasInteraction(olMapUid, interactionId)) {
      return null;
    }
    return this.registeredInteractionsByMap
      .get(olMapUid)!
      .get(interactionId) as IInteraction;
  }
}
