import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import {
  ButtonControlComponent,
  SelectBoxComponent,
  SharedDataService,
} from '@ngx-mechanics';
import { Feature } from 'ol';
import { Condition, never } from 'ol/events/condition';
import BaseEvent from 'ol/events/Event';
import { Extent } from 'ol/extent';
import { Geometry } from 'ol/geom';
import { DragBoxEvent } from 'ol/interaction/DragBox';
import VectorSource from 'ol/source/Vector';
import { StyleLike } from 'ol/style/Style';
import { AbstractSelectionComponent } from '../abstract-selection.component';
import { DefaultBottomSheetTableService } from '../bottom-sheet-table/bottom-sheet-table.service';
import { selectedStyle } from './box-selection.configurator';

/**
 * This component provides a box selection tool for selecting multiple features on an OpenLayers map.
 * It extends the `AbstractSelectionComponent` and utilizes the `DragBox` interaction to allow the user
 * to draw a selection box on the map. The selected features within the box are displayed in a table using
 * the `BottomSheetTableService`.
 */
@Component({
  selector: 'box-selection-widget',
  template: `
    <widget-button-control
      activatedColor="accent"
      deactivatedColor="primary"
      [ariaLabel]="'Box selection'"
      [id]="id"
      [map]="map"
      ><mat-icon class="widget_icon">select_all</mat-icon>
      <ngx-mechanics-select-box
        #btnCtrlWgt
        [id]="id"
        [olMap]="map"
        (interactionActivate)="onSelectInteractionActivate()"
        (interactionDeactivate)="onSelectInteractionDeactivate()"
        (interactionStart)="onSelectInteractionStart($event)"
        (interactionEnd)="onSelectInteractionEnd($event)"
      ></ngx-mechanics-select-box>
    </widget-button-control>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: AbstractSelectionComponent,
      useExisting: forwardRef(() => NgxWidgetBoxSelection),
    },
  ],
  styles: [
    '.ol-dragbox {border: 2px solid var(--color-primary-dark);box-sizing: border-box ; background-color: rgb(from var(--color-primary) r g b / 0.5);}',
  ],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [ButtonControlComponent, MatIconModule, SelectBoxComponent],
})
export class NgxWidgetBoxSelection extends AbstractSelectionComponent {
  @HostBinding('style.left.px') public left = '5';
  @HostBinding('style.bottom.%') public bottom = '75';

  private readonly DEFAULT_ANIMATION_DURATION = 750;
  private readonly DEFAULT_PADDING = [170, 50, 170, 50];

  constructor(
    _cdr: ChangeDetectorRef,
    _sds: SharedDataService,
    private readonly _bottomSheetService: DefaultBottomSheetTableService
  ) {
    super(_cdr, _sds);
  }

  /**
   * Adds event listeners to the DragBox interaction for `boxstart` event.
   * On `boxstart`, previously selected features are cleared.
   */
  public onSelectInteractionStart(evt: BaseEvent | DragBoxEvent): void {
    this.selectCtrl.getFeatures().clear();
  }

  /**
   * Adds event listeners to the DragBox interaction for `boxend` event.
   * On `boxend`, selected features are displayed in a table via the BottomSheet service.
   */
  public onSelectInteractionEnd(evt: BaseEvent | DragBoxEvent): void {
    const boxExtent = evt.target.getGeometry().getExtent();
    const boxFeatures = this.onFeatureSelect(boxExtent);

    if (boxFeatures !== undefined && boxFeatures.length > 0) {
      const boxPropertiesObject = this._getPropertiesObject(
        boxFeatures as [Record<string, string>]
      );
      const isClosed = this._bottomSheetService
        .openTable(boxPropertiesObject, undefined, [
          'map-view.bottom-sheet.box-selection-table.name',
          'map-view.bottom-sheet.box-selection-table.address',
        ])
        .backdropClick();

      isClosed.subscribe(() => this.quitSelection());
    }
  }

  protected getSelectedStyle_(): StyleLike {
    return selectedStyle;
  }
  protected getSelectedCondition_(): Condition {
    return never;
  }

  /**
   * Handles feature selection when the DragBox selection is complete.
   * @param {DragBoxEvent} evt - Event triggered at the end of box selection.
   * @returns {Array<Object>} An array of objects representing the properties of selected features.
   */
  protected onFeatureSelect(boxExtent: any): object[] {
    const boxFeatures = this._getFeaturesInExtent(boxExtent);

    this._selectFeatures(boxFeatures, boxExtent);

    return this._getFeatureProperties(boxFeatures);
  }

  /**
   * Retrieves all features within the specified extent on the map.
   * @param {Extent} extent - The geographical extent of the box selection.
   * @returns {Array<Feature<Geometry>>} Array of features within the extent.
   * @private
   */
  private _getFeaturesInExtent(extent: Extent): Feature<Geometry>[] {
    const features: Feature<Geometry>[] = [];
    this.map.getAllLayers().forEach((lyr) => {
      const source = lyr.getSource() as VectorSource;
      if (source instanceof VectorSource) {
        const featuresInExtent = source.getFeaturesInExtent(extent);
        features.push(...featuresInExtent);
      }
    });
    return features;
  }

  /**
   * Adds features to the selection and adjusts the map view to fit the extent of selected features.
   * @param {Array<Feature<Geometry>>} features - Features to be selected.
   * @param {Extent} extent - The geographical extent of the selection.
   * @private
   */
  private _selectFeatures(features: Feature<Geometry>[], extent: Extent): void {
    features.forEach((feature) => {
      if (
        !this.selectCtrl.getFeatures().getArray().includes(feature) &&
        feature.getGeometry()?.intersectsExtent(extent)
      ) {
        this.selectCtrl.getFeatures().push(feature);
        this.map.getView().fit(extent, {
          duration: this.DEFAULT_ANIMATION_DURATION,
          padding: this.DEFAULT_PADDING,
        });
      }
    });
  }

  /**
   * Extracts specific properties from each selected feature, returning an array of key-value pairs.
   * @param {Array<Feature<Geometry>>} features - Array of selected features.
   * @returns {Array<Object>} Array of objects containing specific properties for each feature.
   * @private
   */
  private _getFeatureProperties(
    features: Feature<Geometry>[]
  ): Record<string, string>[] {
    return features.map((feature) => {
      return {
        [feature.get('nom')]: feature.get('adresse1'), // Mapping 'nom' to 'adresse1'
      };
    });
  }

  /**
   * Converts an array of property objects into a single object.
   * @param {Array<Object>} array - Array of property objects.
   * @returns {Object} Consolidated properties object.
   * @private
   */
  private _getPropertiesObject(
    array: [Record<string, string>]
  ): Record<string, string> {
    return Object.assign({}, ...array);
  }
}
