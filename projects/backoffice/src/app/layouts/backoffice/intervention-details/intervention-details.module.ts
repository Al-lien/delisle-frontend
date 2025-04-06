import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  NgxWxcProgressBarComponent,
  NgxWxcToggleGroupComponent,
  NgxWxsSimpleCardComponent,
} from '@ngx-wxc';
import { ToggleGroupModule } from '../../../features/toggle-group/toggle-group.module';
import { MapModule } from '../../../shared/map/map.module';
import { InterventionDetailsComponent } from './intervention-details.component';

@NgModule({
  declarations: [InterventionDetailsComponent],
  exports: [InterventionDetailsComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MapModule,
    ToggleGroupModule,
    DatePipe,
    NgxWxcProgressBarComponent,
    NgxWxsSimpleCardComponent,
    NgxWxcToggleGroupComponent,
  ],
})
export class InterventionDetailsModule {}
