import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgxWxcButtonRaisedComponent } from '@ngx-wxc';
import { UnauthorizedComponent } from './unauthorized.component';

@NgModule({
  declarations: [UnauthorizedComponent],
  exports: [UnauthorizedComponent],
  imports: [CommonModule, TranslateModule, NgxWxcButtonRaisedComponent],
})
export class UnauthorizedModule {}
