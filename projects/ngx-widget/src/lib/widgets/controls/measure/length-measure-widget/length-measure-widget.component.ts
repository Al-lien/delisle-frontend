import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  HostBinding,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ButtonControlComponent, DrawLineComponent } from '@ngx-mechanics';
import { Coordinate } from 'ol/coordinate';
import { LineString } from 'ol/geom';
import { getLength } from 'ol/sphere';
import { AbstractMeasureComponent } from '../abstract-measure.component';

// NOTE: LOGIC FOR LENGTH MEASUREMENT : UNIQUE CLASS
/**
 * Component for measuring lengths in an OpenLayers map. Extends AbstractMeasureComponent.
 */
@Component({
  selector: 'length-measure-widget',
  template: `
    <widget-button-control
      activatedColor="accent"
      deactivatedColor="primary"
      [ariaLabel]="'Measure length'"
      [id]="id"
      [map]="map"
    >
      <mat-icon class="widget_icon">straighten</mat-icon>
      <ngx-mechanics-draw-line
        #btnCtrlWgt
        [id]="id"
        [olMap]="map"
        (interactionActivate)="onDrawInteractionActivate()"
        (interactionDeactivate)="onDrawInteractionDeactivate()"
        (interactionStart)="onDrawInteractionStart($event)"
        (interactionEnd)="onDrawInteractionEnd($event)"
      ></ngx-mechanics-draw-line>
    </widget-button-control>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: AbstractMeasureComponent,
      useExisting: forwardRef(() => NgxWidgetLengthMeasure),
    },
  ],
  standalone: true,
  imports: [ButtonControlComponent, DrawLineComponent, MatIconModule],
})
export class NgxWidgetLengthMeasure
  extends AbstractMeasureComponent
  implements AfterContentInit
{
  @HostBinding('style.left.px') public left = '5';
  @HostBinding('style.bottom.%') public bottom = '45';

  protected getHelpTextBeforeDrawingKey_(): string {
    return 'widgets.measure.length.before-drawing';
  }
  protected getHelpTextDuringDrawingKey_(): string {
    return 'widgets.measure.length.during-drawing';
  }

  /**
   * Calculates and returns the coordinate for placing the measurement result tooltip.
   * @param {LineString} geometry The line geometry.
   * @returns {Coordinate} Tooltip display position.
   */
  protected processResultTooltipPosition_(geometry: LineString): Coordinate {
    return geometry.getLastCoordinate();
  }

  /**
   * Formats the length of the drawn line.
   * @param {LineString} line The line geometry.
   * @param {ProjectionLike} options.projection The current map EPSG code.
   * @return {string} The formatted length.
   */
  protected getFormatResult_(line: LineString): string {
    const length = getLength(line, {
      projection: this.map.getView().getProjection(),
    });
    return length > 100
      ? `${Math.round((length / 1000) * 100) / 100} km`
      : `${Math.round(length * 100) / 100} m`;
  }
}
