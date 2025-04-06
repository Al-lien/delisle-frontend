import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { IMenuLink } from '../../models';

@Component({
  selector: 'ngx-wxc-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MatTabsModule,
    MatIconModule,
    RouterLink,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class NgxWxcNavigationComponent<T> {
  @Input() public navigations!: IMenuLink<T>[];
}
