import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SideMenuComponent } from './side-menu.component';

@NgModule({
  declarations: [SideMenuComponent],
  exports: [SideMenuComponent],
  imports: [
    CommonModule,
    MatListModule,
    RouterModule,
    TranslateModule,
    MatIconModule,
  ],
})
export class SideMenuModule {}
