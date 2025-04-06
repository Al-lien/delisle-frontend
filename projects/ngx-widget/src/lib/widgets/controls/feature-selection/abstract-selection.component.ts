import { ChangeDetectorRef, Component } from '@angular/core';
import { AbstractWidgetComponent, SharedDataService } from '@ngx-mechanics';
import { Condition } from 'ol/events/condition';
import { Select } from 'ol/interaction';
import { StyleLike } from 'ol/style/Style';

/**
 * An abstract base component for selection tools on an OpenLayers map.
 * It provides foundational functionality for feature selection interactions and defines abstract methods
 * that must be implemented by subclasses, such as initializing interactions and handling feature selection.
 */
@Component({
  template: '',
})
export abstract class AbstractSelectionComponent extends AbstractWidgetComponent {
  /**
   * The Select interaction controller for selecting features on the map.
   * Must be initialized in a subclass.
   * @protected
   * @type {Select}
   */
  protected selectCtrl!: Select;

  protected constructor(_cdr: ChangeDetectorRef, _sds: SharedDataService) {
    super(_cdr, _sds);
  }

  /**
   * Clears all the selected features in the map and animates the map view back to its minimum zoom level.
   * This method is typically called when the user exits selection mode.
   *
   * @protected
   * @param  click - Observable for monitoring mouse click events.
   */
  protected quitSelection(): void {
    this.map.getInteractions().forEach((interaction) => {
      if (interaction instanceof Select) {
        interaction.getFeatures().clear();
      }
    });
    this.map.getView().animate({
      zoom: this.map.getView().getMinZoom(),
      duration: 500,
    });
  }

  protected onSelectInteractionDeactivate(): void {
    this.quitSelection();
    this.map.removeInteraction(this.selectCtrl);
  }

  protected initSelectionCtrl(): void {
    this.selectCtrl = new Select({
      style: this.getSelectedStyle_(),
      condition: this.getSelectedCondition_(), // Trigger selection method (click, drag,)
    });

    this.map.addInteraction(this.selectCtrl);
  }

  /**
   * Initializes map interactions for feature selection.
   * Must be implemented by subclasses to set up specific selection behaviors.
   * @protected
   * @abstract
   *
   * Initializes interactions for box selection and sets up event listeners for drag box events.
   * The `Select` interaction is created and added to the map, allowing features to be selected within the drawn box.
   *
   * Initializes the interaction for single-click feature selection.
   * The `Select` interaction is configured to trigger on click events and apply a custom style to selected features.
   * Sets up an event listener to handle feature selection when the user clicks on a feature.
   */
  protected onSelectInteractionActivate(): void {
    console.log('on select activate');
    this.initSelectionCtrl();
    this._cdr.detectChanges();
  }

  /**
   * Handles feature selection events.
   * Must be implemented by subclasses to define actions that occur when a feature is selected.
   * @protected
   * @abstract
   * @param {any} evt - Event associated with feature selection.
   */
  protected abstract onFeatureSelect(evt: unknown): void;

  protected abstract getSelectedStyle_(): StyleLike;
  protected abstract getSelectedCondition_(): Condition;
}
