import { Component } from '@angular/core';
import { DialogService } from '../../core/services/dialog.service';
import { SnackbarService } from '../../core/services/snackbar.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {
  constructor(
    private readonly _snackbarService: SnackbarService,
    private readonly _dialogService: DialogService
  ) {}

  public error(): void {
    this._snackbarService.openError('username');
  }

  public info(): void {
    this._snackbarService.openInfo('password');
  }

  public success(): void {
    this._snackbarService.openSuccess('register');
  }

  public dialog(): void {
    this._dialogService.openDialog(
      'username',
      ['password', 'username', 'register'],
      'register',
      'cancel',
      'submit'
    );
  }
}
