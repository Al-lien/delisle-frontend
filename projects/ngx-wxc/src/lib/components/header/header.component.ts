import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'ngx-wxc-app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
  imports: [CommonModule, MatToolbarModule],
})
export class NgxWxcHeaderComponent {
  @Input() public title: string = '';
}
