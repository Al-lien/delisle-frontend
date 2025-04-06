import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { Map, MapBrowserEvent } from 'ol';

@Component({
  selector: 'ngx-wxc-map[id][map]',
  template: '',
  styles: [':host {height: 30vh; display: flex; border-radius: 10px}'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxWxcMapComponent implements AfterViewInit {
  @Input() public map!: Map;

  ngAfterViewInit(): void {
    this._initMap();
    if (this.map) {
      /**
       * This method defers the map target setting to the next microtask,
       * ensuring that the DOM is ready
       */
      Promise.resolve().then(() => {
        this.map.setTarget();
        this.map.setTarget('ol-map');
      });
    }
  }

  private _initMap(): void {
    this.map.on('pointermove', (event: MapBrowserEvent<PointerEvent>) =>
      this._onMapHover(event)
    );
  }

  private _onMapHover(event: MapBrowserEvent<PointerEvent>): void {
    const hit = this.map.forEachFeatureAtPixel(event.pixel, () => {
      return true;
    });

    this.map.getTargetElement().style.cursor = hit ? 'pointer' : '';
  }
}
