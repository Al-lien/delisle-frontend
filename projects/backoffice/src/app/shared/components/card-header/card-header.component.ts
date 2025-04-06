import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card-header',
  templateUrl: './card-header.component.html',
  styleUrl: './card-header.component.scss',
})
export class CardHeaderComponent {
  @Input() public title!: string | undefined;
  @Input() public subtitle!: string | undefined;
  @Input() public text!: string | undefined;
  @Input() public labelBtn!: string;
  @Output() public action: EventEmitter<void> = new EventEmitter<void>();

  public onClick(): void {
    this.action.emit();
  }
}
