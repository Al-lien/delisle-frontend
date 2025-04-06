import { ComponentType } from '@angular/cdk/portal';
import { Inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IDialogComponent } from '../components';
import { DIALOG_COMPONENT_TOKEN } from '../tokens/dialog.token';

export interface IDialogService {
  /**
   * Open a dialog with the provided data.
   * @param title header of the dialog.
   * @param body content of the dialog.
   * @param subtitle subtitle of the dialog. Optional.
   * @param cancelBtn text of the cancel action button. Optional.
   * @param confirmBtn text of the confirm action. Optional.
   */
  openDialog(
    title: string,
    content: string | string[],
    subtitle?: string,
    close?: string,
    actions?: string
  ): MatDialogRef<IDialogComponent, unknown>;
}

export type DialogService = IDialogService;

@Injectable({
  providedIn: 'root',
})
export class DefaultDialogService implements IDialogService {
  constructor(
    @Inject(DIALOG_COMPONENT_TOKEN)
    private readonly _dialogModal: ComponentType<IDialogComponent>,
    private readonly _dialog: MatDialog
  ) {}

  public openDialog(
    title: string,
    content: string | string[],
    subtitle?: string,
    close?: string,
    actions?: string
  ): MatDialogRef<IDialogComponent, unknown> {
    return this._dialog.open(this._dialogModal, {
      data: {
        title,
        content,
        subtitle,
        close,
        actions,
      },
    });
  }
}
