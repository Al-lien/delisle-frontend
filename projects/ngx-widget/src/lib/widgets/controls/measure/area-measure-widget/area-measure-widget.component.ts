import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  HostBinding,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ButtonControlComponent, DrawAreaComponent } from '@ngx-mechanics';
import { Coordinate } from 'ol/coordinate';
import { Polygon, SimpleGeometry } from 'ol/geom';
import { getArea } from 'ol/sphere';
import { AbstractMeasureComponent } from '../abstract-measure.component';

// NOTE: LOGIC FOR AREA MEASUREMENT : UNIQUE CLASS
/**
 * Component for measuring areas in an OpenLayers map. Extends AbstractMeasureComponent.
 */
@Component({
  selector: 'area-measure-widget',
  template: `
    <widget-button-control
      activatedColor="accent"
      deactivatedColor="primary"
      [ariaLabel]="'Measure area'"
      [id]="id"
      [map]="map"
    >
      <mat-icon class="widget_icon">square_foot</mat-icon>
      <ngx-mechanics-draw-area
        #btnCtrlWgt
        [id]="id"
        [olMap]="map"
        (interactionActivate)="onDrawInteractionActivate()"
        (interactionDeactivate)="onDrawInteractionDeactivate()"
        (interactionStart)="onDrawInteractionStart($event)"
        (interactionEnd)="onDrawInteractionEnd($event)"
      ></ngx-mechanics-draw-area>
    </widget-button-control>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: AbstractMeasureComponent,
      useExisting: forwardRef(() => NgxWidgetAreaMeasure),
    },
  ],
  standalone: true,
  imports: [ButtonControlComponent, DrawAreaComponent, MatIconModule],
})
export class NgxWidgetAreaMeasure
  extends AbstractMeasureComponent
  implements AfterContentInit
{
  @HostBinding('style.left.px') public left = '5';
  @HostBinding('style.bottom.%') public bottom = '55';

  protected getHelpTextBeforeDrawingKey_(): string {
    return 'widgets.measure.area.before-drawing';
  }
  protected getHelpTextDuringDrawingKey_(): string {
    return 'widgets.measure.area.during-drawing';
  }

  /**
   * Calculates and returns the coordinate for placing the area measurement result tooltip.
   * @param {Polygon} geometry The polygon geometry.
   * @returns {Coordinate} Tooltip display position.
   */
  protected processResultTooltipPosition_(geometry: Polygon): Coordinate {
    return geometry.getInteriorPoint().getCoordinates();
  }

  /**
   * Formats the area of the drawn polygon.
   * @param {Polygon} polygon The polygon geometry.
   * @param {ProjectionLike} options.projection The current map EPSG code (used in ol method).
   * @returns {string} The formatted area.
   */
  protected getFormatResult_(geometry: SimpleGeometry): string {
    const area = getArea(geometry, {
      projection: this.map.getView().getProjection(),
    });

    return area > 10000
      ? `${Math.round((area / 1000000) * 100) / 100} km<sup>2</sup>`
      : `${Math.round(area * 100) / 100} m<sup>2</sup>`;
  }
}
