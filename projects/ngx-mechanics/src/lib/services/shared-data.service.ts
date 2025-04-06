import { Injectable, signal, WritableSignal } from '@angular/core';
import { Subject } from 'rxjs';

export const InteractionActionEnum = {
  on: 'on',
  off: 'off',
};

export type InteractionAction = keyof typeof InteractionActionEnum;

export interface IButtonWidgetAction {
  id: string;
  activated: boolean;
}

export interface IInteractionAction {
  status: InteractionAction;
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  public activeWidget: WritableSignal<string | null>;
  public subjects: Subject<IButtonWidgetAction>;

  constructor() {
    this.subjects = new Subject<IButtonWidgetAction>();
    this.activeWidget = signal<string | null>(null);
  }

  public isActiveWidget(widgetId: string): boolean {
    return this.activeWidget() === widgetId;
  }

  public getActiveWidget(): string | null {
    return this.activeWidget();
  }

  public setWidgetActive(widgetId: string): void {
    this.setWidgetInactive();
    this.activeWidget.set(widgetId);
  }

  public setWidgetInactive(): void {
    this.activeWidget.set(null);
  }
}
