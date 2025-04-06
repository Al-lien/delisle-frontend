import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  HostBinding,
  OnInit,
} from '@angular/core';
import { AbstractWidgetComponent, SharedDataService } from '@ngx-mechanics';
import MousePosition from 'ol/control/MousePosition';
import { Coordinate, CoordinateFormat, createStringXY } from 'ol/coordinate';

/**
 * Component to display the current mouse position on a map.
 * showing the X and Y values formatted to a specified precision.
 */
@Component({
  selector: 'mouse-position-widget',
  template: '',
  styles: [
    ':host {background-color: rgb(from var(--color-primary) r g b / 0.5);color: var(--color-light-text);padding: 10px;border-radius: 4px;font-size: 1rem;}',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  /**
   * `useExisting` tells Angular to use an existing instance of a different provider rather than creating a new one.
   * Normally, AbstractWidgetComponent would be undefined at the time Angular sets up the component because
   * MousePositionWidgetComponent references itself in its providers array.
   * This creates a circular dependency.
   * To solve this, forwardRef is used, which delays the resolution of MousePositionWidgetComponent until after the initial setup phase,
   * ensuring Angular can reference MousePositionWidgetComponent without an error.
   */
  providers: [
    {
      provide: AbstractWidgetComponent,
      useExisting: forwardRef(() => NgxWidgetMousePosition),
    },
  ],
  standalone: true,
})
export class NgxWidgetMousePosition
  extends AbstractWidgetComponent
  implements OnInit
{
  /**
   * CSS values used to define widget position in the map.
   */
  @HostBinding('style.bottom.px') public bottom = '5';
  @HostBinding('style.right.px') public right = '5';

  @HostBinding('style.width') public width = '130px';
  @HostBinding('style.min-width') public minWidth = 'min-content';
  @HostBinding('style.height') public height = '20px';
  @HostBinding('style.min-height') public minHeight = 'min-content';

  /**
   * The current mouse position on the map, represented as an array of [x, y] coordinates.
   * Default value is set to [0, 0].
   */
  public mousePosition: Coordinate = [0, 0];

  /**
   * OpenLayers MousePosition control, which manages the retrieval and display of the
   * current mouse coordinates on the map.
   */
  private _control!: MousePosition;

  constructor(
    private readonly _el: ElementRef<HTMLElement>,
    _cdr: ChangeDetectorRef,
    _sds: SharedDataService
  ) {
    super(_cdr, _sds);
  }

  /**
   * Initializes the MousePosition control and adds it to the map.
   * Sets up an event listener to update `mousePosition` on pointer move events.
   */
  ngOnInit(): void {
    this._initMousePosition();
  }

  /**
   * Removes the MousePosition control from the map upon component destruction.
   */
  ngOnDestroy(): void {
    if (this.map) {
      this.map.removeControl(this._control);
    }
  }

  /**
   * The format for displaying coordinates, allowing a configurable number of decimal places.
   * Defaults to four decimal places.
   */
  private _coordinateFormat(): CoordinateFormat {
    return createStringXY(4);
  }

  /**
   * Configures the MousePosition control with the appropriate format and projection,
   * and attaches it to the component's DOM element.
   * Sets up an event listener on the map to update the mouse position.
   */
  private _initMousePosition(): void {
    this._control = new MousePosition({
      coordinateFormat: this._coordinateFormat(),
      projection: this.map.getView().getProjection().getCode(),
      target: this._el.nativeElement,
      placeholder: '00.0000, 00.0000',
    });
    this.map.addControl(this._control);

    this._cdr.detectChanges();
  }
}
