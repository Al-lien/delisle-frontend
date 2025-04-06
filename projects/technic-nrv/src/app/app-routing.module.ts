import { NgModule } from '@angular/core';
import { provideRouter, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layouts/home/home.component';
import { NotFoundComponent } from './layouts/not-found/not-found.component';
import { UnauthorizedComponent } from './layouts/unauthorized/unauthorized.component';

export enum ROUTER_TOKENS {
  ACCOUNT = 'connexion',
  INTERVENTIONS = 'interventions',
  HOME = 'home',
  UNAUTHORIZED = 'unauthorized',
}

const routes: Routes = [
  {
    path: '',
    redirectTo: ROUTER_TOKENS.ACCOUNT,
    pathMatch: 'full',
  },
  {
    path: ROUTER_TOKENS.ACCOUNT,
    loadChildren: () =>
      import('@ngx-wxc').then((m) => m.NgxWxcAuthenticationModule),
  },
  {
    path: ROUTER_TOKENS.HOME,
    component: HomeComponent,
    loadChildren: () =>
      import('./layouts/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: ROUTER_TOKENS.UNAUTHORIZED,
    component: UnauthorizedComponent,
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [provideRouter(routes)],
})
export class AppRoutingModule {}
