import { CommonModule, DatePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  WritableSignal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { IStationCard } from '../../models';

@Component({
  selector: 'ngx-wxc-station-card',
  templateUrl: './station-card.component.html',
  styleUrl: './station-card.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    DatePipe,
  ],
})
export class NgxWxcStationCardComponent<T> {
  /**
   * Item displayed in the card.
   */
  @Input() public item!: T;

  /**
   * The item selected by the user when clicking on the button.
   * Should be a signal provided by the parent.
   */
  @Input() public selectedItem!: WritableSignal<T | undefined>;

  /**
   * The current selected item id from the list.
   */
  @Input() public attributeOfSelection!: unknown;

  /**
   * Method to implement in parent component in order to format the object provided
   * according to this template.
   */
  @Input() public displayReport!: (item: T) => IStationCard;

  @Input() public activeStyle?: boolean = true;

  @Output() public onSelected: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Set the selected station.
   */
  public isSelectedStation(): void {
    this.selectedItem.set(this.item);
    this.onSelected.emit();
  }
}
