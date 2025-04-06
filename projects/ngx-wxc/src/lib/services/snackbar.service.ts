import { Injectable } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

export interface ISnackbarService {
  /**
   * Opens a snackbar with a warn css style.
   * A material icon is set by default (`close`).
   * A css class is set by default (`snackbar-error`).
   * @param messageKey the key path to the i18n file.
   */
  openError(messageKey: string): void;

  /**
   * Opens a snackbar with an info css style.
   * A material icon is set by default (`arrow_back`).
   * A css class is set by default (`snackbar-info`).
   * @param messageKey the key path to the i18n file.
   */
  openInfo(messageKey: string): void;

  /**
   * Opens a snackbar with a success css style.
   * A material icon is set by default (`arrow_forward`).
   * A css class is set by default (`snackbar-success`).
   * @param messageKey the key path to the i18n file.
   */
  openSuccess(messageKey: string): void;

  /**
   * Open a snackbar with the provided parameters.
   * @param messageKey text displayed
   * @param icon icon displayed
   * @param panelClass css class used on the component
   */
  onOpenSnackbar(
    messageKey: string,
    icon: string,
    panelClass: SnackbarPanelClass
  ): void;
}

export type SnackbarService = ISnackbarService;

export type SnackbarPanelClass =
  | 'snackbar-info'
  | 'snackbar-error'
  | 'snackbar-success';

export declare interface TextOnlySnackBar {
  data: {
    message: string;
    action: string;
  };
  snackBarRef: MatSnackBarRef<TextOnlySnackBar>;
  action: () => void;
  hasAction: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class DefaultSnackbarService implements ISnackbarService {
  public onOpenSnackbar(
    messageKey: string,
    icon: string,
    panelClass: SnackbarPanelClass
  ): void {
    console.log('SNACKBAR:: ON OPEN SNACKBAR');
  }

  /**
   * Open snackbar with error style
   * @param messageKey text content displayed in the snackbar
   */
  public openError(messageKey: string): void {
    console.log('SNACKBAR:: OPEN ERROR');
  }

  /**
   * Open snackbar with info style
   * @param messageKey text content displayed in the snackbar
   */
  public openInfo(messageKey: string): void {
    console.log('SNACKBAR:: OPEN INFO');
  }

  /**
   * Open snackbar with success style
   * @param messageKey text content displayed in the snackbar
   */
  public openSuccess(messageKey: string): void {
    console.log('SNACKBAR:: OPEN SUCCESS');
  }
}
