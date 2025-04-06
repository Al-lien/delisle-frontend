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
import { DialogComponentData, IDialogComponent } from '../default-dialog';

export interface IConfirmDialogComponent {
  title: string;
  subtitle: string;
  content: string;
  close: string;
  actions: string;
}

export type DialogConfirmData = IConfirmDialogComponent;

@Component({
  selector: 'ngx-wxc-confirm-dialog',
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
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxWxcConfirmDialogComponent implements IDialogComponent {
  @HostBinding('style.white-space') public whiteSpace = 'pre-line';
  public readonly title: string;
  public readonly content: string | string[];
  public readonly subtitle: string;
  public readonly close: string;
  public readonly actions: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogComponentData) {
    this.title = this.data.title;

    if (!Array.isArray(this.data.content)) {
      this.content = [this.data.content];
    } else {
      this.content = this.data.content;
    }
    this.subtitle = this.data.subtitle ?? '';
    this.close = this.data.close ?? '';
    this.actions = this.data.actions ?? '';
  }
}
