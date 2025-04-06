import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AbstractWidgetComponent } from '@ngx-mechanics';
import { FeatureLike } from 'ol/Feature';
import { Pixel } from 'ol/pixel';

@Component({
  selector: 'info-tooltip-widget',
  template: '<div #infoTooltip class="ol-info-tooltip"></div>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: AbstractWidgetComponent,
      useExisting: forwardRef(() => NgxWidgetInfoTooltip),
    },
  ],
  standalone: true,
  imports: [],
})
export class NgxWidgetInfoTooltip
  extends AbstractWidgetComponent
  implements OnInit
{
  @ViewChild('infoTooltip') public infoTooltip!: ElementRef<HTMLDivElement>;

  public hoveredItem: FeatureLike | undefined = undefined;

  ngOnInit(): void {
    this._onFeatureHover();
  }

  /**
   * Registers a pointermove event to show the tooltip on hover.
   * It hides the tooltip when the pointer leaves the map.
   */
  private _onFeatureHover(): void {
    this.map.on('pointermove', this._onPointerMove.bind(this));
    this.map.getTargetElement().addEventListener('pointerleave', () => {
      this.hoveredItem = undefined;
      this._hideTooltip();
    });
  }

  /**
   * Determines if a feature is under the pointer and calls _showTooltip
   * to position the tooltip based on the pixel location of the pointer.
   * @param event : pointer moving event
   * @returns
   */
  private _onPointerMove(event: any): void {
    if (event.dragging) {
      this._hideTooltip();
      this.hoveredItem = undefined;
      return;
    }

    const pixel = this.map.getEventPixel(event.originalEvent);
    const feature = this.map.forEachFeatureAtPixel(pixel, (feature) => feature);

    if (feature && this.infoTooltip) {
      this._showTooltip(pixel, feature.getProperties());
      this.hoveredItem = feature;
    } else if (this.infoTooltip) {
      this._hideTooltip();
    }
  }

  /**
   * Hides the tooltip when there’s no feature under the pointer.
   */
  private _hideTooltip(): void {
    if (this.infoTooltip) {
      const infoElement = this.infoTooltip.nativeElement;
      infoElement.style.opacity = '0';
    }
  }

  /**
   * Displays feature information (e.g., name of the station) at the tooltip position.
   * @param pixel
   * @param feature
   */
  private _showTooltip(pixel: Pixel, feature: any): void {
    if (this.infoTooltip) {
      const infoElement = this.infoTooltip.nativeElement;
      infoElement.style.left = `${pixel[0]}px`;
      infoElement.style.top = `${pixel[1]}px`;
      infoElement.style.opacity = '1';
      infoElement.innerText = feature.nom ?? 'Station introuvable...';
    }
  }
}
