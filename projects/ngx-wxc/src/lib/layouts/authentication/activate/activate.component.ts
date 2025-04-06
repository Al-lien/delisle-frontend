import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  inject,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CodeInputComponent, CodeInputModule } from 'angular-code-input';
import { NgxWxcHeaderComponent } from '../../../components';
import {
  NgxWxcButtonCancelComponent,
  NgxWxcButtonRaisedComponent,
  NgxWxcButtonSubmitComponent,
} from '../../../form';
import { IExceptionResponse } from '../../../models/exception-response.model';
import { DefaultDialogService, SnackbarService } from '../../../services';
import { AuthenticationService } from '../../../services/authentication.service';
import { PageRedirectService } from '../../../services/page-redirect.service';
import {
  AUTHENTICATION_SERVICE_TOKEN,
  SNACKBAR_SERVICE_TOKEN,
} from '../../../tokens';
import { PAGE_REDIRECT_SERVICE_TOKEN } from '../../../tokens/page-redirect.token';
import { ActivateUtils } from './activate.utils';

@Component({
  selector: 'ngx-wxc-app-activate',
  templateUrl: './activate.component.html',
  styleUrl: './activate.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    NgxWxcHeaderComponent,
    TranslateModule,
    MatIcon,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    NgxWxcButtonSubmitComponent,
    NgxWxcButtonRaisedComponent,
    NgxWxcButtonCancelComponent,
    CodeInputModule,
  ],
})
export class NgxWxcActivateComponent {
  @ViewChild('codeInput') public codeInput!: CodeInputComponent;
  public readonly dialog = inject(MatDialog);

  public codeValid: boolean = false;
  public submitted: boolean = false;
  public isLoading: boolean = false;

  constructor(
    private readonly _cdr: ChangeDetectorRef,
    private readonly _router: Router,
    private readonly _dialogService: DefaultDialogService,
    @Inject(PAGE_REDIRECT_SERVICE_TOKEN)
    private readonly _pageRedirectService: PageRedirectService,
    @Inject(AUTHENTICATION_SERVICE_TOKEN)
    private readonly _authService: AuthenticationService,
    @Inject(SNACKBAR_SERVICE_TOKEN)
    private readonly _snackbarService: SnackbarService
  ) {}

  public onCodeCompleted(token: string): void {
    this.isLoading = true;
    this._authService.activateAccount(token).subscribe({
      error: (err: IExceptionResponse) => {
        this._snackbarService.openError(
          (err.error as string) || (err.businessErrorDescription as string)
        );
        this.codeValid = false;
        this.isLoading = false;
      },
      next: () => {
        this.codeValid = true;
      },
      complete: () => {
        this._pageRedirectService.setRedirected(false);
        this.submitted = true;
        this.isLoading = false;
        this._cdr.detectChanges();
      },
    });
  }

  public onResendCode(): void {
    this._snackbarService.openInfo('account-activation.snackbar.resend-code');
  }

  public redirectToLogin(): void {
    this._router.navigate(['.']);
  }

  public onCancel(): void {
    const { title, content, close, actions } =
      ActivateUtils.cancelActivateDialog;
    this._dialogService
      .openDialog(title, content, undefined, close, actions)
      .afterClosed()
      .subscribe((value) => {
        if (value) {
          this.redirectToLogin();
        }
      });
  }
}
