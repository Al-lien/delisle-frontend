import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { TranslateModule } from '@ngx-translate/core';

export interface IDialogComponent {
  title: string;
  content: string | string[];
  subtitle?: string;
  close?: string;
  actions?: string;
}

export type DialogComponentData = IDialogComponent;

@Component({
  selector: 'ngx-wxc-default-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatDividerModule,
    TranslateModule,
  ],
  templateUrl: './default-dialog.component.html',
  styles: 'button { cursor: pointer; }',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxWxcDefaultDialogComponent implements IDialogComponent {
  @HostBinding('style.white-space') public whiteSpace = 'pre-line';

  public readonly title: string;
  public readonly content: string | string[];
  public readonly subtitle?: string;
  public readonly close?: string;
  public readonly actions?: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogComponentData) {
    this.title = this.data.title;
    this.close = this.data.close;
    this.actions = this.data.actions;

    if (!Array.isArray(this.data.content)) {
      this.content = [this.data.content];
    } else {
      this.content = this.data.content;
    }
  }
}
