import { ComponentType } from '@angular/cdk/portal';
import { Inject, Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarRef,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import {
  ISnackbarComponent,
  ISnackbarService,
  SNACKBAR_COMPONENT_TOKEN,
  SnackbarPanelClass,
} from '@ngx-wxc';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
// EXPORT
export class SnackbarService implements ISnackbarService {
  public config: MatSnackBarConfig = {
    horizontalPosition: 'right',
    verticalPosition: 'bottom',
  };

  constructor(
    @Inject(SNACKBAR_COMPONENT_TOKEN)
    private readonly _snackbarModal: ComponentType<ISnackbarComponent>,
    private readonly _snackBar: MatSnackBar,
    private readonly _translateService: TranslateService
  ) {}

  /**
   * Open snackbar with provided configuration
   * @param messageKey key path to i18n file instead of simple string.
   * @param icon material icon displayed in the component
   * @param panelClass css class used in the component
   */
  public onOpenSnackbar(
    messageKey: string | string[],
    icon: string,
    panelClass: SnackbarPanelClass
  ): void {
    const { verticalPosition, horizontalPosition } = this.config;
    this._translateAndOpen(
      messageKey,
      icon,
      verticalPosition as MatSnackBarVerticalPosition,
      horizontalPosition as MatSnackBarHorizontalPosition,
      panelClass
    ).subscribe();
  }

  /**
   * Open snackbar with error style
   * @param messageKey text content displayed in the snackbar
   */
  public openError(messageKey: string): void {
    this.onOpenSnackbar(messageKey, 'warning', 'snackbar-error');
  }

  /**
   * Open snackbar with info style
   * @param messageKey text content displayed in the snackbar
   */
  public openInfo(messageKey: string): void {
    this.onOpenSnackbar(messageKey, 'info', 'snackbar-info');
  }

  /**
   * Open snackbar with success style
   * @param messageKey text content displayed in the snackbar
   */
  public openSuccess(messageKey: string | string[]): void {
    this.onOpenSnackbar(messageKey, 'check_circle', 'snackbar-success');
  }

  /**
   * Translate the key provided and run the method to open a snackbar.
   * @param messageKey the key path to the i18n file.
   */
  private _translateAndOpen(
    messageKey: string | string[],
    icon: string,
    verticalPosition: MatSnackBarVerticalPosition,
    horizontalPosition: MatSnackBarHorizontalPosition,
    panelClass?: string
  ): Observable<MatSnackBarRef<ISnackbarComponent>> {
    console.log(panelClass);
    return this._translateService.get(messageKey).pipe(
      map((message) => {
        message = Array.isArray(message) ? message.join() : message;
        return this._snackBar.openFromComponent(this._snackbarModal, {
          data: { message, icon },
          verticalPosition,
          horizontalPosition,
          panelClass,
        });
      })
    );
  }
}
