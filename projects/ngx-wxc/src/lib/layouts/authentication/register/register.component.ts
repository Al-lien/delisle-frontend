import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatError } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgxWxcPasswordCheckComponent } from '../../../features';
import {
  NgxWxcButtonSubmitComponent,
  NgxWxcInputPasswordComponent,
  NgxWxcInputTextComponent,
} from '../../../form';
import { IExceptionResponse } from '../../../models/exception-response.model';
import { AuthenticationService, SnackbarService } from '../../../services';
import { PageRedirectService } from '../../../services/page-redirect.service';
import {
  AUTHENTICATION_SERVICE_TOKEN,
  SNACKBAR_SERVICE_TOKEN,
} from '../../../tokens';
import { PAGE_REDIRECT_SERVICE_TOKEN } from '../../../tokens/page-redirect.token';
import {
  passwordFormatValidator,
  passwordMatchingValidator,
} from '../../../validators';

@Component({
  selector: 'ngx-wxc-app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    TranslateModule,
    MatError,
    MatDividerModule,
    NgxWxcPasswordCheckComponent,
    NgxWxcInputTextComponent,
    NgxWxcInputPasswordComponent,
    NgxWxcButtonSubmitComponent,
  ],
})
export class NgxWxcRegisterComponent implements OnInit {
  public registerUserForm!: FormGroup;
  public firstnameControl!: FormControl<string | null>;
  public lastnameControl!: FormControl<string | null>;
  public emailControl!: FormControl<string | null>;
  public passwordControl!: FormControl<string | null>;
  public confirmPasswordControl!: FormControl<string | null>;

  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    @Inject(PAGE_REDIRECT_SERVICE_TOKEN)
    private readonly _pageRedirectService: PageRedirectService,
    @Inject(AUTHENTICATION_SERVICE_TOKEN)
    private readonly _authService: AuthenticationService,
    @Inject(SNACKBAR_SERVICE_TOKEN)
    private readonly _snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this._initRegisterForm();
  }

  public onRegister(): void {
    const { firstname, lastname, email, password } =
      this.registerUserForm.getRawValue();
    const apiPayload = { firstname, lastname, email, password };

    this._authService.register(apiPayload).subscribe({
      error: (err: IExceptionResponse) => {
        this._snackbarService.openError(err.businessErrorDescription as string);
      },
      complete: () => {
        this._pageRedirectService.setRedirected(true);
        this._router.navigate(['activate-account'], {
          relativeTo: this._route,
          state: { email: email },
        });
      },
    });
  }

  public getPasswordValue(): string {
    return this.passwordControl.value ? this.passwordControl.value : '';
  }

  private _initRegisterForm(): void {
    this.firstnameControl = new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]);

    this.lastnameControl = new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]);

    this.emailControl = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);

    this.passwordControl = new FormControl('', [
      Validators.required,
      passwordFormatValidator,
    ]);

    this.confirmPasswordControl = new FormControl('', [Validators.required]);

    this.registerUserForm = new FormGroup(
      {
        firstname: this.firstnameControl,
        lastname: this.lastnameControl,
        email: this.emailControl,
        password: this.passwordControl,
        confirmPassword: this.confirmPasswordControl,
      },
      passwordMatchingValidator('password', 'confirmPassword')
    );
  }
}
