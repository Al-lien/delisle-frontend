import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { AssignedComponent } from './assigned/assigned.component';
import { AssignedModule } from './assigned/assigned.module';
import { BackofficeComponent } from './backoffice.component';
import { MapViewComponent } from './map-view/map-view.component';
import { MapViewModule } from './map-view/map-view.module';
import { ReportComponent } from './report/report.component';
import { ReportModule } from './report/report.module';
import { SideMenuModule } from './side-menu/side-menu.module';
import { WaitingForValidationComponent } from './waiting-for-validation/waiting-for-validation.component';
import { WaitingForValidationModule } from './waiting-for-validation/waiting-for-validation.module';

export enum BackofficeRouterTokensEnum {
  _ = '',
  REPORT = 'report',
  ASSIGNED = 'assigned',
  WAITING_FOR_VALIDATION = 'pending',
  MAP_VIEW = 'map',
}

export type BackofficeRouterTokens = BackofficeRouterTokensEnum;

export const BACKOFFICE_ROUTES: Routes = [
  {
    path: BackofficeRouterTokensEnum._,
    redirectTo: BackofficeRouterTokensEnum.REPORT,
    pathMatch: 'full',
  },
  {
    path: BackofficeRouterTokensEnum.REPORT,
    component: ReportComponent,
  },
  {
    path: BackofficeRouterTokensEnum.ASSIGNED,
    component: AssignedComponent,
  },
  {
    path: BackofficeRouterTokensEnum.WAITING_FOR_VALIDATION,
    component: WaitingForValidationComponent,
  },
  {
    path: BackofficeRouterTokensEnum.MAP_VIEW,
    component: MapViewComponent,
  },
];

@NgModule({
  declarations: [BackofficeComponent],
  exports: [BackofficeComponent],
  imports: [
    CommonModule,
    SideMenuModule,
    ReportModule,
    AssignedModule,
    WaitingForValidationModule,
    MatSidenavModule,
    MapViewModule,
    RouterOutlet,
    RouterModule.forChild(BACKOFFICE_ROUTES),
  ],
  providers: [],
})
export class BackofficeModule {}
