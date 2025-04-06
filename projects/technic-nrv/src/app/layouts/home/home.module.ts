import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {
  NgxWxcButtonRaisedComponent,
  NgxWxcHeaderComponent,
  NgxWxcNavigationComponent,
} from '@ngx-wxc';
import { NgxWxcCardHeaderComponent } from '../../../../../ngx-wxc/src/lib/components/card-header/card-header.component';
import { NgxWxcProgressBarComponent } from '../../../../../ngx-wxc/src/lib/components/progress-bar/progress-bar.component';
import { NgxWxcToggleGroupComponent } from '../../../../../ngx-wxc/src/lib/features/toggle-group/toggle-group.component';
import { NgxWxcButtonSubmitComponent } from '../../../../../ngx-wxc/src/lib/form/buttons/button-submit/button-submit.component';
import { NgxWxcMapComponent } from '../../../../../ngx-wxc/src/lib/map/map.component';
import { InterventionDetailsComponent } from '../intervention-details/intervention-details.component';
import { InterventionsComponent } from '../interventions/interventions.component';
import { MapComponent } from '../map/map.component';
import { SettingsComponent } from '../settings/settings.component';
import { HomeComponent } from './home.component';

export enum HOME_ROUTER_TOKENS_ENUM {
  _ = '',
  INTERVENTIONS = 'interventions',
  MAP = 'map',
  SETTINGS = 'settings',
}

export type HomeRouterTokens = keyof typeof HOME_ROUTER_TOKENS_ENUM;

const HOME_ROUTES: Routes = [
  {
    path: '',
    redirectTo: HOME_ROUTER_TOKENS_ENUM.INTERVENTIONS,
    pathMatch: 'full',
  },
  {
    path: HOME_ROUTER_TOKENS_ENUM.INTERVENTIONS,
    component: InterventionsComponent,
    loadChildren: () =>
      import('../interventions/interventions.module').then(
        (m) => m.InterventionsModule
      ),
  },
  {
    path: `${HOME_ROUTER_TOKENS_ENUM.INTERVENTIONS}/:id`,
    component: InterventionDetailsComponent,
  },
  {
    path: HOME_ROUTER_TOKENS_ENUM.MAP,
    component: MapComponent,
    loadChildren: () => import('../map/map.module').then((m) => m.MapModule),
  },
  {
    path: HOME_ROUTER_TOKENS_ENUM.SETTINGS,
    component: SettingsComponent,
    loadChildren: () =>
      import('../settings/settings.module').then((m) => m.SettingsModule),
  },
];

@NgModule({
  declarations: [HomeComponent, InterventionDetailsComponent],
  imports: [
    CommonModule,
    TranslateModule,
    NgxWxcNavigationComponent,
    NgxWxcButtonRaisedComponent,
    NgxWxcHeaderComponent,
    MatButtonModule,
    MatIconModule,
    RouterOutlet,
    RouterModule.forChild(HOME_ROUTES),
    NgxWxcCardHeaderComponent,
    NgxWxcButtonSubmitComponent,
    NgxWxcToggleGroupComponent,
    NgxWxcMapComponent,
    NgxWxcProgressBarComponent,
  ],
  exports: [HomeComponent],
})
export class HomeModule {}
