import { Component, ViewEncapsulation } from '@angular/core';
import { IMenuLink } from '@ngx-wxc';
import { HOME_ROUTER_TOKENS_ENUM } from './home.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
  public readonly navigations: IMenuLink<HOME_ROUTER_TOKENS_ENUM>[] = [
    {
      path: HOME_ROUTER_TOKENS_ENUM.INTERVENTIONS,
      label: HOME_ROUTER_TOKENS_ENUM.INTERVENTIONS,
      matIcon: 'home',
    },
    {
      path: HOME_ROUTER_TOKENS_ENUM.MAP,
      label: HOME_ROUTER_TOKENS_ENUM.MAP,
      matIcon: 'map',
    },
    {
      path: HOME_ROUTER_TOKENS_ENUM.SETTINGS,
      label: HOME_ROUTER_TOKENS_ENUM.SETTINGS,
      matIcon: 'settings',
    },
  ];
}
