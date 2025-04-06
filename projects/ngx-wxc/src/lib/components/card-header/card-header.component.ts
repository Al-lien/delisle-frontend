import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { NgxWxcButtonSubmitComponent } from '../../form';

@Component({
  selector: 'ngx-wxc-card-header',
  templateUrl: './card-header.component.html',
  styleUrl: './card-header.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    TranslateModule,
    NgxWxcButtonSubmitComponent,
  ],
})
export class NgxWxcCardHeaderComponent {
  @Input() public title!: string | undefined;
  @Input() public subtitle!: string | undefined;
  @Input() public text!: string | undefined;
  @Input() public labelBtn!: string;
  @Output() public action: EventEmitter<void> = new EventEmitter<void>();

  public onClick(): void {
    this.action.emit();
  }
}
