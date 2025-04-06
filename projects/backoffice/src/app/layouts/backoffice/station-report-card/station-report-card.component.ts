import { Component, Input, WritableSignal } from '@angular/core';
import { IStationCard } from '@ngx-wxc';

@Component({
  selector: 'app-station-card',
  templateUrl: './station-report-card.component.html',
  styleUrl: './station-report-card.component.scss',
})
export class StationCardComponent<T> {
  @Input() public item!: T;
  @Input() public selectedItem!: WritableSignal<T | undefined>;
  @Input() public attributeOfSelection!: unknown;
  @Input() public displayReport!: (item: T) => IStationCard;

  public isSelectedStation(): void {
    this.selectedItem.set(this.item);
  }
}
