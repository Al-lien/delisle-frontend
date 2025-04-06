import { NgModule } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  RouterModule,
  Routes,
  withComponentInputBinding,
  withPreloading,
} from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { BackofficeComponent } from './layouts/backoffice/backoffice.component';
import { NotFoundComponent } from './layouts/not-found/not-found.component';
import { UnauthorizedComponent } from './layouts/unauthorized/unauthorized.component';

export const ROUTER_TOKENS = {
  ACCOUNT: 'account',
  BACK_OFFICE: 'back-office',
  NOT_FOUND: 'not-found',
  WELCOME: 'welcome',
  TECHNICIANS: 'technician',
  UNAUTHORIZED: 'restricted-access',
};

const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'account',
    pathMatch: 'full',
  },
  {
    path: 'account',
    loadChildren: () =>
      import('@ngx-wxc').then((m) => m.NgxWxcAuthenticationModule),
  },
  {
    path: ROUTER_TOKENS.BACK_OFFICE,
    component: BackofficeComponent,
    loadChildren: () =>
      import('./layouts/backoffice/backoffice.module').then(
        (m) => m.BackofficeModule
      ),
    canActivate: [authGuard],
  },
  {
    path: ROUTER_TOKENS.UNAUTHORIZED,
    component: UnauthorizedComponent,
    loadChildren: () =>
      import('./layouts/unauthorized/unauthorized.module').then(
        (m) => m.UnauthorizedModule
      ),
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

/*
 * In an SSR application, {useHash: false} will leverage the benefits of the
 * HTML5 history API, enhance SEO, and provide a better user experience.
 * 👆 -> default config
 */
@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule],
  providers: [
    provideRouter(
      APP_ROUTES,
      withComponentInputBinding(),
      withPreloading(PreloadAllModules)
    ),
  ],
})
export class AppRoutingModule {}
