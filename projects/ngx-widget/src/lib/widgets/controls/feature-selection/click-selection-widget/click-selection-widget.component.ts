import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  HostBinding,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  ButtonControlComponent,
  SelectClickComponent,
  SharedDataService,
} from '@ngx-mechanics';
import { click, Condition } from 'ol/events/condition';
import BaseEvent from 'ol/events/Event';
import { Point } from 'ol/geom';
import { SelectEvent } from 'ol/interaction/Select';
import { StyleLike } from 'ol/style/Style';
import { AbstractSelectionComponent } from '../abstract-selection.component';
import { DefaultBottomSheetTableService } from '../bottom-sheet-table/bottom-sheet-table.service';
import { clickSelectedStyle } from './click-selection.configurator';

/**
 * ClickSelectionWidgetComponent
 *
 * This component provides a single-click selection tool for selecting individual features on an OpenLayers map.
 * It extends the `AbstractSelectionComponent` and uses the `Select` interaction to enable selection by clicking on features.
 * Selected feature properties are displayed in a table using the `BottomSheetTableService`.
 */
@Component({
  selector: 'click-selection-widget',
  template: `
    <widget-button-control
      activatedColor="accent"
      deactivatedColor="primary"
      [ariaLabel]="'Single click selection'"
      [id]="id"
      [map]="map"
    >
      <mat-icon class="widget_icon">adjust</mat-icon>
      <ngx-mechanics-select-click
        #btnCtrlWgt
        [id]="id"
        [olMap]="map"
        (interactionActivate)="onSelectInteractionActivate()"
        (interactionDeactivate)="onSelectInteractionDeactivate()"
        (interactionStart)="onSelectInteractionStart($event)"
      ></ngx-mechanics-select-click>
    </widget-button-control>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: AbstractSelectionComponent,
      useExisting: forwardRef(() => NgxWidgetClickSelection),
    },
  ],
  standalone: true,
  imports: [ButtonControlComponent, MatIconModule, SelectClickComponent],
})
export class NgxWidgetClickSelection extends AbstractSelectionComponent {
  @HostBinding('style.left.px') public left = '5';
  @HostBinding('style.bottom.%') public bottom = '65';

  constructor(
    _cdr: ChangeDetectorRef,
    _sds: SharedDataService,
    private readonly _bottomSheetService: DefaultBottomSheetTableService
  ) {
    super(_cdr, _sds);
  }

  public onSelectInteractionStart(evt: BaseEvent): void {
    this.onFeatureSelect(evt as SelectEvent);
  }

  protected getSelectedStyle_(): StyleLike {
    return clickSelectedStyle;
  }
  protected getSelectedCondition_(): Condition {
    return click;
  }

  /**
   * Handles feature selection on click.
   * If a feature is selected, its properties are displayed in a bottom sheet, and the map view animates to center on the feature's geometry.
   * @param {SelectEvent} evt - Event triggered by the selection of a feature.
   */
  protected onFeatureSelect(evt: SelectEvent): void {
    const selectEvent = evt.selected[0];

    if (
      selectEvent.getProperties() !== undefined &&
      selectEvent !== undefined
    ) {
      const geo = selectEvent.getGeometry() as Point;

      // Animate map to center on the selected feature
      this.map.getView().animate({
        center: geo.getCoordinates(),
        zoom: 15,
        duration: 500,
      });

      // Open bottom sheet to display feature properties
      const isClosed = this._bottomSheetService
        .openTable(
          selectEvent.getProperties(),
          selectEvent.get('nom') // Title for the table, using the 'nom' property
        )
        .backdropClick();

      // Exit selection mode if bottom sheet is closed
      isClosed.subscribe(() => this.quitSelection());
    }
  }
}
