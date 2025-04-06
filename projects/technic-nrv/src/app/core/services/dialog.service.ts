import { ComponentType } from '@angular/cdk/portal';
import { Inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  DIALOG_COMPONENT_TOKEN,
  IDialogComponent,
  IDialogService,
} from '@ngx-wxc';

@Injectable({
  providedIn: 'root',
})
export class DialogService implements IDialogService {
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
