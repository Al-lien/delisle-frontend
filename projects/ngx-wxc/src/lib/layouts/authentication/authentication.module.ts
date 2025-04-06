import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CodeInputModule } from 'angular-code-input';
import { NgxWxcHeaderComponent } from '../../components';
import { NgxWxcButtonRaisedComponent } from '../../form';
import { onRedirectionGuard } from '../../guards/on-redirection.guard';
import { NgxWxcActivateComponent } from './activate/activate.component';
import { NgxWxcAuthenticationComponent } from './authentication.component';
import { NgxWxcLoginComponent } from './login/login.component';
import { NgxWxcRegisterComponent } from './register/register.component';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: NgxWxcAuthenticationComponent,
  },
  {
    path: 'activate-account',
    component: NgxWxcActivateComponent,
    canActivate: [onRedirectionGuard],
  },
];

@NgModule({
  declarations: [NgxWxcAuthenticationComponent],
  imports: [
    TranslateModule,
    MatTabsModule,
    MatDividerModule,
    NgxWxcActivateComponent,
    NgxWxcButtonRaisedComponent,
    NgxWxcHeaderComponent,
    NgxWxcLoginComponent,
    NgxWxcRegisterComponent,
    RouterModule.forChild(AUTH_ROUTES),
    CodeInputModule.forRoot({
      codeLength: 6,
      isCodeHidden: false,
      code: 'number',
    }),
  ],
  exports: [RouterModule],
})
export class NgxWxcAuthenticationModule {}
