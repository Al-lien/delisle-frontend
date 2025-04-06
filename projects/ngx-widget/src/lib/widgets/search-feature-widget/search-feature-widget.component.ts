import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  HostBinding,
  Input,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { AbstractWidgetComponent } from '@ngx-mechanics';
import { NgxWxcSearchBarComponent } from '@ngx-wxc';
import { Feature } from 'ol';
import { never } from 'ol/events/condition';
import { Geometry, Point } from 'ol/geom';
import { Select } from 'ol/interaction';
import VectorLayer from 'ol/layer/Vector';
import { selectedStyle } from './search-feature.configurator';

@Component({
  selector: 'search-feature-widget',
  template: `
    <ngx-wxc-search-bar
      [label]="'widgets.search-features'"
      [items]="validFeatures"
      [optionLabel]="displayFeatureLabel"
      (onSelected)="selectedFeature($event)"
    ></ngx-wxc-search-bar>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: AbstractWidgetComponent,
      useExisting: forwardRef(() => NgxWidgetSearchFeature),
    },
  ],
  standalone: true,
  imports: [NgxWxcSearchBarComponent],
})
export class NgxWidgetSearchFeature
  extends AbstractWidgetComponent
  implements OnInit
{
  @HostBinding('style.left.px') public left = '0';
  @HostBinding('style.right.px') public right = '0';
  @HostBinding('style.top.px') public top = '5';

  @Input() public layer!: VectorLayer;

  public validFeatures: Feature<Geometry>[] = [];
  public selectCtrl!: Select;
  public selectedFeature$: WritableSignal<Feature | undefined> =
    signal(undefined);

  ngOnInit(): void {
    this._initInteraction();
    this.layer.getSource()?.on('addfeature', () => {
      this._validateFeatures(this.layer.getSource()?.getFeatures());
    });

    this._cdr.detectChanges();
  }

  public displayFeatureLabel(value: unknown): string {
    if (
      (value as Feature<Geometry>) &&
      typeof (value as Feature<Geometry>).get === 'function'
    ) {
      const name = (value as Feature<Geometry>).get('nom') as string;
      return name;
    }
    return '';
  }

  public selectedFeature($event: unknown): void {
    this.selectCtrl.getFeatures().clear();

    const extent = ($event as Feature<Geometry>).getGeometry() as Point;
    const view = this.map.getView();

    view.animate(
      {
        center: extent.getCoordinates(),
        zoom: 15,
        duration: 500,
      },
      () => {
        this.selectCtrl.getFeatures().push($event as Feature<Geometry>);
      }
    );
  }

  private _initInteraction(): void {
    this.selectCtrl = new Select({
      style: selectedStyle,
      condition: never,
    });

    this.map.addInteraction(this.selectCtrl);
  }

  private _validateFeatures(features: Feature<Geometry>[] | undefined): void {
    this.validFeatures =
      features?.filter(
        (feature): feature is Feature<Geometry> => feature !== undefined
      ) || [];
  }
}
