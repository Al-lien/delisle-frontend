import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  effect,
  Input,
  WritableSignal,
} from '@angular/core';
import { Feature, Map, MapBrowserEvent, View } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { Point } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { selectedStyle } from '../../layouts/backoffice/map-view/map-view.configurator';

@Component({
  selector: 'app-map',
  template: '',
  styles: [':host {height: 30vh; display: flex; border-radius: 10px}'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent<T> implements AfterViewInit {
  @Input() public map!: Map;
  @Input() public selectedItem$!: WritableSignal<T>;
  @Input() public displayCoordinates!: (item: T) => [number, number];

  private _vectorLayer!: VectorLayer;

  constructor() {
    effect(() => {
      if (this.selectedItem$) {
        if (this.displayCoordinates(this.selectedItem$())) {
          this._setMapCenter(
            this.map.getView(),
            this.displayCoordinates(this.selectedItem$())
          );
        }
      }
    });
  }

  ngAfterViewInit(): void {
    this._initMap();
    if (this.map) {
      /**
       * This method defers the map target setting to the next microtask,
       * ensuring that the DOM is ready
       */
      Promise.resolve().then(() => {
        this.map.setTarget(undefined);
        this.map.setTarget('ol-map');
      });
    }
  }

  private _initMap(): void {
    this._vectorLayer = new VectorLayer({
      source: new VectorSource(),
    });

    if (!this.map.getLayers().getArray().includes(this._vectorLayer)) {
      this.map.addLayer(this._vectorLayer);
    }

    this.map.on('pointermove', (event: MapBrowserEvent<PointerEvent>) =>
      this._onMapHover(event)
    );
  }

  private _setMapCenter(view: View, [lng, lat]: [number, number]): void {
    view.animate({ center: [lng, lat], duration: 500 }, () =>
      this._setMarkerPoint(view)
    );
  }

  private _setMarkerPoint(view: View): void {
    const center: Coordinate = view.getCenter() as Coordinate;

    const vectorSource = this._vectorLayer.getSource();
    vectorSource?.clear();

    const pointFeature = new Feature({
      geometry: new Point(center),
    });

    pointFeature.setStyle(selectedStyle);

    vectorSource?.addFeature(pointFeature);
  }

  private _onMapHover(event: MapBrowserEvent<PointerEvent>): void {
    const hit = this.map.forEachFeatureAtPixel(event.pixel, () => {
      return true;
    });

    if (hit === true) {
      this.map.getTargetElement().style.cursor = 'pointer';
    } else {
      this.map.getTargetElement().style.cursor = '';
    }
  }
}
