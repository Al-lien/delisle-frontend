import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';
import {
  NgxWxcButtonSubmitComponent,
  NgxWxcCardHeaderComponent,
  NgxWxcHeaderComponent,
  NgxWxcMapComponent,
  NgxWxcNavigationComponent,
  NgxWxcProgressBarComponent,
  NgxWxcStationCardComponent,
  NgxWxcToggleGroupComponent,
} from '@ngx-wxc';
import { InterventionsComponent } from './interventions.component';

export enum TECHNIC_ROUTER_TOKENS_ENUM {
  INTERVENTIONS = 'interventions',
  MAP = 'carte',
  PROFIL = 'profil',
}

export type TechnicRouterTokens = TECHNIC_ROUTER_TOKENS_ENUM;

@NgModule({
  declarations: [InterventionsComponent],
  imports: [
    CommonModule,
    TranslateModule,
    NgxWxcHeaderComponent,
    NgxWxcNavigationComponent,
    ScrollingModule,
    MatProgressSpinnerModule,
    NgxWxcButtonSubmitComponent,
    NgxWxcCardHeaderComponent,
    NgxWxcStationCardComponent,
    NgxWxcToggleGroupComponent,
    NgxWxcMapComponent,
    NgxWxcProgressBarComponent,
  ],
  exports: [InterventionsComponent],
})
export class InterventionsModule {}
