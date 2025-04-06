import { Component, EventEmitter, Output } from '@angular/core';
import { IMenuLink } from '@ngx-wxc';
import {
  BackofficeRouterTokens,
  BackofficeRouterTokensEnum,
} from '../backoffice.module';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
})
export class SideMenuComponent {
  @Output() public loggedOut: EventEmitter<void> = new EventEmitter();
  public readonly BACKOFFICE_TOKENS = BackofficeRouterTokensEnum;

  public readonly links: IMenuLink<BackofficeRouterTokens>[] = [
    {
      path: this.BACKOFFICE_TOKENS.REPORT,
      label: 'backoffice-card.side-menu.report',
      matIcon: 'report',
    },
    {
      path: this.BACKOFFICE_TOKENS.ASSIGNED,
      label: 'backoffice-card.side-menu.assigned',
      matIcon: 'engineering',
    },
    {
      path: this.BACKOFFICE_TOKENS.WAITING_FOR_VALIDATION,
      label: 'backoffice-card.side-menu.pending',
      matIcon: 'pending_actions',
    },
    {
      path: this.BACKOFFICE_TOKENS.MAP_VIEW,
      label: 'backoffice-card.side-menu.map-view',
      matIcon: 'map',
    },
  ];

  public onLogout(): void {
    this.loggedOut.emit();
  }
}
