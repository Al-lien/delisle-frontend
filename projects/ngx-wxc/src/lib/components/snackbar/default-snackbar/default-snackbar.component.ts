import { Component, HostBinding, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

export interface ISnackbarComponent {
  message: string;
  icon: string;
}

export type SnackbarData = ISnackbarComponent;

@Component({
  selector: 'ngx-wxc-default-snackbar',
  standalone: true,
  imports: [
    MatButtonModule,
    MatSnackBarLabel,
    MatSnackBarActions,
    MatSnackBarAction,
    MatIconModule,
  ],
  templateUrl: './default-snackbar.component.html',
  styles: '.snackbar-label {display: flex; align-items: center; gap: 1rem}',
})
export class NgxWxcDefaultSnackbarComponent implements ISnackbarComponent {
  @HostBinding('style.display') public display = 'flex';
  public icon: string;
  public message: string;

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: SnackbarData,
    public snackBarRef: MatSnackBarRef<ISnackbarComponent>
  ) {
    this.message = data.message;
    this.icon = data.icon;
  }
}
