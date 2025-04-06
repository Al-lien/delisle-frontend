import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'ngx-wxc-app-authentication',
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxWxcAuthenticationComponent {
  @ViewChild('authTabs', { static: false }) public authTabs!: MatTabGroup;

  public goToCreateAccountTab(): void {
    this.authTabs.selectedIndex = 1;
  }
}
