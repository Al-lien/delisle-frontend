import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  HostBinding,
  Input,
  QueryList,
} from '@angular/core';
import { isNil } from 'lodash-es';
import { getUid, Map } from 'ol';
import { AbstractInteractionComponent } from '../../interactions';
import {
  IInteractionAction,
  InteractionService,
  SharedDataService,
} from '../../services';

export interface IAbstractButtonControlComponent
  extends IButtonControlComponentPosition {
  id: string;
  map: Map;
  onActivate(): void;
  onDeactivate(): void;
}

export interface IButtonControlComponentPosition {
  width: string;
  minWidth: string;
  height: string;
  minHeight: string;
  position: string;
  zIndex: string;
}

@Component({
  template: '',
})
export abstract class AbstractButtonControlComponent
  implements IAbstractButtonControlComponent, AfterContentInit
{
  @ContentChildren('btnCtrlWgt', { descendants: true })
  public wdgt!: QueryList<AbstractInteractionComponent<unknown>>;
  /**
   * CSS position is defined absolute by default.
   */
  @HostBinding('style.width') public width = '61px';
  @HostBinding('style.min-width') public minWidth = this.width;
  @HostBinding('style.height') public height = '61px';
  @HostBinding('style.min-height') public minHeight = this.height;
  @HostBinding('style.position') public position = 'absolute';
  @HostBinding('style.z-index') public zIndex = '9999';

  @Input() public id!: string;
  @Input() public map!: Map;

  constructor(
    protected _cdr: ChangeDetectorRef,
    protected _sharedDataService: SharedDataService,
    protected _interactionService: InteractionService
  ) {}

  ngAfterContentInit(): void {
    if (this.wdgt.first.interaction) {
      this.wdgt.first.interaction.changes.subscribe({
        next: (value: IInteractionAction) => {
          if (value.status === 'on') {
            this._sharedDataService.setWidgetActive(this.id);
          }

          if (
            value.status === 'off' &&
            !isNil(this._sharedDataService.getActiveWidget())
          ) {
            this._interactionService.deactivate(getUid(this.map), this.id);
            this._sharedDataService.subjects.next({
              id: this.id,
              activated: false,
            });
          }
        },
        complete: () => this._cdr.detectChanges(),
      });
    }
  }

  public onActivate(): void {
    // Activate widget
    this._interactionService.activate(getUid(this.map), this.id);

    // sent signal to widget to start interaction actions
    this._sharedDataService.subjects.next({ id: this.id, activated: true });

    // set button as active
    this._sharedDataService.setWidgetActive(this.id);

    this._cdr.detectChanges();
  }

  public onDeactivate(): void {
    // Deactivate the widget
    this._interactionService.deactivate(getUid(this.map), this.id);

    // sent signal to widget to stop interaction actions
    this._sharedDataService.subjects.next({
      id: this.id,
      activated: false,
    });

    // set button as inactive
    this._sharedDataService.setWidgetInactive();

    this._cdr.detectChanges();
  }
}
