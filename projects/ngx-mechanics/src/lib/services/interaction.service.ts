import { Injectable } from '@angular/core';
import {
  IDrawInteractionOptions,
  ISelectInteractionOption,
} from '../interactions';
import { InteractionManager } from '../managers/interaction.manager';
import { IInteraction, IInteractionOptions } from '../models/interaction.model';

@Injectable({
  providedIn: 'root',
})
export class InteractionService {
  constructor(private readonly _interactionManager: InteractionManager) {}
  // TODO: CREATE COMMON INTERFACE
  public provide<T extends IInteraction = IInteraction>(
    interactionOptions: IDrawInteractionOptions | ISelectInteractionOption
  ): IInteraction {
    return this._interactionManager.provide<T>(interactionOptions);
  }

  public delete(olMapUid: string, interactionId: string): void {
    return this._interactionManager.delete(olMapUid, interactionId);
  }

  public deactivateAll(olMapUid: string): void {
    return this._interactionManager.deactivateAll(olMapUid);
  }

  public activate(olMapUid: string, interactionId: string): void {
    return this._interactionManager.activate(olMapUid, interactionId);
  }

  public deactivate(olMapUid: string, interactionId: string): void {
    return this._interactionManager.deactivate(olMapUid, interactionId);
  }

  public update<T extends IInteractionOptions>(
    olMapUid: string,
    interactionId: string,
    options: T
  ): void {
    this._interactionManager.update<T>(olMapUid, interactionId, options);
  }
}
