import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { NgxWidgetDispatcher } from '@ngx-widget';
import { Map } from 'ol';
import { FeatureLike } from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON.js';
import { DragZoom, Select } from 'ol/interaction';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { environment } from '../../../../environments/environment';
import { MapService } from '../../../services/map.service';
import { defaultStyle } from './map-view.configurator';
@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapViewComponent implements OnInit, AfterViewInit {
  @ViewChild('widgetProvider', { read: ViewContainerRef })
  public widgetProviderVCR!: ViewContainerRef;

  public map!: Map;
  public hoveredItem: FeatureLike | undefined = undefined;
  public newLayer!: VectorLayer;

  private readonly _interactionToRemove = [Select, DragZoom];

  constructor(private readonly _mapService: MapService) {}

  ngOnInit(): void {
    this._initMap();
  }

  ngAfterViewInit(): void {
    this._createWidgetDispatcher();
  }

  private _initMap(): void {
    this.map = this._mapService.createMap();

    this._interactionToRemove.forEach((instance) =>
      this._removeUselessInteraction(instance)
    );

    this._initLayer();
  }

  /**
   * Remove provided type of interaction
   * @param interactionType : interaction type {@link Select}, {@link DragZoom}, etc...
   */
  private _removeUselessInteraction(interactionType: any): void {
    this.map
      .getInteractions()
      .getArray()
      .filter((interaction) => interaction instanceof interactionType)
      .forEach((selectInteraction) =>
        this.map.removeInteraction(selectInteraction)
      );
  }

  /**
   * Fetch GeoJSON file and set the layer to the map.
   * Add a default style to the features.
   */
  private _initLayer(): void {
    this.newLayer = new VectorLayer({
      source: new VectorSource({
        url: environment.map.config.layer,
        format: new GeoJSON(),
      }),
      style: defaultStyle,
    });

    this.map.addLayer(this.newLayer);
  }

  private _createWidgetDispatcher(): void {
    const widgetDispatcherRef = this.widgetProviderVCR.createComponent(
      NgxWidgetDispatcher,
      {
        index: 0,
      }
    );
    const widgetDispatcherComponent = widgetDispatcherRef.instance;
    widgetDispatcherComponent.map = this.map;
    widgetDispatcherComponent.newLayer = this.newLayer;
  }
}
