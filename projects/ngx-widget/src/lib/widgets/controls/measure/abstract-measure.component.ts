import { AfterContentInit, ChangeDetectorRef, Component } from '@angular/core';
import { AbstractWidgetComponent, SharedDataService } from '@ngx-mechanics';
import { TranslateService } from '@ngx-translate/core';
import { Feature, MapBrowserEvent, Overlay } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { EventsKey } from 'ol/events';
import BaseEvent from 'ol/events/Event';
import { SimpleGeometry } from 'ol/geom';
import { DrawEvent } from 'ol/interaction/Draw';
import { unByKey } from 'ol/Observable';
import { lastValueFrom } from 'rxjs';

/**
 * Abstract component for creating map measurement tools in OpenLayers.
 * Provides base functionality for handling drawing interactions,
 * displaying tooltips, and formatting measurement results.
 */
@Component({
  template: '',
})
export abstract class AbstractMeasureComponent
  extends AbstractWidgetComponent
  implements AfterContentInit
{
  /** The help tooltip element. */
  public helpTooltipElement!: HTMLElement;

  /** Overlay to show the help messages. */
  public helpTooltip!: Overlay;

  /** The measure tooltip element. */
  public measureTooltipElement: HTMLElement | undefined = undefined;

  /** Overlay to show the measurement. */
  public measureTooltip!: Overlay;

  /** Currently drawn feature. */
  public sketch: Feature | undefined = undefined;

  /** Message to show when the user is drawing a line. */
  public helpMsg: string = '';

  /** Message to show when the user is drawing a line. */
  public continueMsg: string = '';

  /** Message displayed in the tooltip */
  public infoTooltipMsg: string = '';

  /** Listen to mouse position change during drawing */
  public listenerPointerMoveDuringDrawing: EventsKey | EventsKey[] = [];

  /** Listen to the drawing events */
  public listenerDrawChange: EventsKey | EventsKey[] | undefined = undefined;

  /** Tooltip displaying length */
  public tooltipCoord: Coordinate = [];

  constructor(
    _cdr: ChangeDetectorRef,
    _sds: SharedDataService,
    private readonly _translateService: TranslateService
  ) {
    super(_cdr, _sds);
  }

  ngAfterContentInit(): void {
    lastValueFrom(
      this._translateService.get(this.getHelpTextBeforeDrawingKey_())
    ).then((text: string) => (this.helpMsg = text));
    lastValueFrom(
      this._translateService.get(this.getHelpTextDuringDrawingKey_())
    ).then((text: string) => (this.continueMsg = text));
  }

  /**
   * Activates the drawing interaction and attaches pointer movement listeners.
   */
  public onDrawInteractionActivate(): void {
    this._clearMeasureResult();

    this.listenerPointerMoveDuringDrawing = this.map.on('pointermove', (evt) =>
      this._pointerMoveHandler(evt)
    );

    this._createHelpTooltip();
    this._cdr.detectChanges();
  }

  /**
   * Clear listeners and HTML elements.
   */
  public onDrawInteractionDeactivate(): void {
    this._clearMeasureResult();

    if (
      this.listenerPointerMoveDuringDrawing !== null ||
      this.listenerPointerMoveDuringDrawing !== undefined
    ) {
      unByKey(this.listenerPointerMoveDuringDrawing);
    }

    if (this.listenerDrawChange !== undefined) {
      unByKey(this.listenerDrawChange);
    }
  }

  /**
   * Handles the start of a drawing interaction, attaching listeners for geometry changes.
   * @param {DrawEvent} drawEvent The drawing start event.
   */
  public onDrawInteractionStart(drawEvent: DrawEvent): void {
    this._createMeasureTooltip();

    this.sketch = drawEvent.feature;

    this.listenerDrawChange = this.sketch
      .getGeometry()
      ?.on('change', (evt: BaseEvent) => this._onDrawChange(evt));
  }

  /**
   * Finalizes the drawing interaction:
   * - Sets tooltip to static.
   * - Clears sketch and reinitializes tooltips.
   */
  public onDrawInteractionEnd(_: DrawEvent): void {
    if (this.measureTooltipElement) {
      this.measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
      this.measureTooltip.setOffset([0, -7]);
    }

    this.sketch = undefined;
    this.measureTooltipElement = undefined;

    unByKey(this.listenerDrawChange as EventsKey | EventsKey[]);
  }

  /**
   * Handles pointer movement on the map:
   * - Updates tooltip messages based on the drawing state.
   * - Displays help tooltip during drawing.
   * @param {MapBrowserEvent<UIEvent>} evt The pointer move event.
   */
  private _pointerMoveHandler(evt: MapBrowserEvent<UIEvent>): void {
    if (evt.dragging) {
      return;
    }
    this.infoTooltipMsg = this.sketch ? this.continueMsg : this.helpMsg;
    this._displayHelpInfoTip(evt);
  }

  /**
   * Clean tooltips :
   * - measure,
   * - helper,
   * - clear remaining VectorSource.
   */
  private _clearMeasureResult(): void {
    if (this.helpTooltip) {
      this.map.removeOverlay(this.helpTooltip);
    }
    if (this.measureTooltip) {
      this.map.removeOverlay(this.measureTooltip);
      this.measureTooltipElement?.remove();
    }
  }

  /**
   * Displays the help tooltip with the current message.
   * @param {MapBrowserEvent<UIEvent>} evt The pointer move event.
   */
  private _displayHelpInfoTip(evt: MapBrowserEvent<UIEvent>): void {
    this.helpTooltipElement.innerHTML = this.infoTooltipMsg;
    this.helpTooltip.setPosition(evt.coordinate);

    this.helpTooltipElement.classList.remove('hidden');
  }

  /**
   * Updates the measurement tooltip with the current geometry measurement.
   * @param {BaseEvent} evt The geometry change event.
   */
  private _onDrawChange(evt: BaseEvent): void {
    (this.measureTooltipElement as HTMLElement).innerHTML =
      this.getFormatResult_(evt.target);
    this.measureTooltip.setPosition(
      this.processResultTooltipPosition_(evt.target)
    );
  }

  /**
   * Creates the tooltip for displaying help messages during drawing.
   */
  private _createHelpTooltip(): void {
    this.helpTooltip = this._createTooltip('hidden', [15, 0], 'center-left');
    this.helpTooltipElement = this.helpTooltip.getElement() as HTMLElement;
  }

  /**
   * Clean tooltip if exists.
   * Then creates the tooltip for displaying measurement results.
   */
  private _createMeasureTooltip(): void {
    if (this.measureTooltipElement) {
      this.measureTooltipElement.remove();
    }

    if (this.measureTooltip) {
      this.map.removeOverlay(this.measureTooltip);
    }

    this.measureTooltip = this._createTooltip(
      'ol-tooltip-measure',
      [0, -15],
      'bottom-center'
    );
    this.measureTooltipElement =
      this.measureTooltip.getElement() as HTMLElement;
  }

  /**
   * Create tooltip helper.
   */
  private _createTooltip(
    className: string,
    offset: [number, number],
    positioning: 'center-left' | 'bottom-center'
  ): Overlay {
    const tooltipElement = document.createElement('div');
    tooltipElement.className = `ol-tooltip ${className}`;
    const tooltip = new Overlay({
      element: tooltipElement,
      offset: offset,
      positioning: positioning,
    });
    this.map.addOverlay(tooltip);
    return tooltip;
  }

  /**
   * Gets the help text to display before drawing begins.
   * @returns Translation key for the help message.
   */
  protected abstract getHelpTextBeforeDrawingKey_(): string;

  /**
   * Gets the help text to display during drawing.
   * @returns Translation key for the continue message.
   */
  protected abstract getHelpTextDuringDrawingKey_(): string;

  /**
   * the result of the drawn geometry, e.g., length or area.
   * @param {SimpleGeometry} geometry The geometry to format.
   * @returns The formatted measurement result.
   */
  protected abstract getFormatResult_(geometry: SimpleGeometry): string;

  /**
   * Processes and returns the coordinate where the measurement tooltip should appear.
   * @param {SimpleGeometry} geometry The geometry to measure.
   * @returns The coordinate for displaying the tooltip.
   */
  protected abstract processResultTooltipPosition_(
    geometry: SimpleGeometry
  ): Coordinate;
}
