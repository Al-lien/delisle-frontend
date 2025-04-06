import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxWidgetSearchFeature } from '@ngx-widget';
import { MapModule } from '../../../shared/map/map.module';
import { MapViewComponent } from './map-view.component';

@NgModule({
  declarations: [MapViewComponent],
  exports: [MapViewComponent],
  imports: [CommonModule, MapModule, NgxWidgetSearchFeature],
})
export class MapViewModule {}
