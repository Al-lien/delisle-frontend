import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IExceptionResponse } from '@ngx-wxc';
import { SnackbarService } from '../../core/services/snackbar.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrl: './backoffice.component.scss',
})
export class BackofficeComponent {
  constructor(
    private readonly _router: Router,
    private readonly _snackbarService: SnackbarService,
    private readonly _authService: AuthenticationService
  ) {}

  public logout(): void {
    this._authService.logout().subscribe({
      error: (err: IExceptionResponse) => {
        this._snackbarService.openError(err.businessErrorDescription as string);
      },
      complete: () => {
        this._router.navigate(['..']);
      },
    });
  }
}
