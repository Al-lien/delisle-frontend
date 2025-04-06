import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {
  NgxWxcButtonSubmitComponent,
  NgxWxcInputPasswordComponent,
  NgxWxcInputTextComponent,
  NgxWxcSlideToggleComponent,
} from '../../../form';
import { IExceptionResponse } from '../../../models/exception-response.model';
import { SnackbarService } from '../../../services';
import { AuthenticationService } from '../../../services/authentication.service';
import { RoleRedirectService } from '../../../services/role-redirect.service';
import {
  AUTHENTICATION_SERVICE_TOKEN,
  SNACKBAR_COMPONENT_TOKEN,
} from '../../../tokens';
import { ROLE_REDIRECT_SERVICE_TOKEN } from '../../../tokens/role-redirect.token';

@Component({
  selector: 'ngx-wxc-app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    TranslateModule,
    NgxWxcInputTextComponent,
    NgxWxcInputPasswordComponent,
    NgxWxcSlideToggleComponent,
    NgxWxcButtonSubmitComponent,
  ],
})
export class NgxWxcLoginComponent implements OnInit {
  public loginUserForm!: FormGroup;
  public emailControl!: FormControl<string | null>;
  public passwordControl!: FormControl<string | null>;
  public rememberMe!: FormControl<boolean | null>;

  constructor(
    @Inject(ROLE_REDIRECT_SERVICE_TOKEN)
    private readonly _roleRedirectService: RoleRedirectService,
    @Inject(AUTHENTICATION_SERVICE_TOKEN)
    private readonly _authService: AuthenticationService,
    @Inject(SNACKBAR_COMPONENT_TOKEN)
    private readonly _snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this._initLoginForm();
  }

  public onLogin(): void {
    const { email, password, rememberMe } = this.loginUserForm.getRawValue();
    const apiPayload = { email, password };

    this._authService.login(apiPayload, rememberMe).subscribe({
      error: (err: IExceptionResponse) => {
        this._snackbarService.openError(err.businessErrorDescription as string);
      },
      complete: () => {
        this._roleRedirectService.redirectAfterLogin();
      },
    });
  }

  private _initLoginForm(): void {
    this.emailControl = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);

    this.passwordControl = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]);

    this.rememberMe = new FormControl(false);

    this.loginUserForm = new FormGroup({
      email: this.emailControl,
      password: this.passwordControl,
      rememberMe: this.rememberMe,
    });
  }
}
