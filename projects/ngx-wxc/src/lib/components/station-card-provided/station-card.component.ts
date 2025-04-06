import { CommonModule, DatePipe } from '@angular/common';
import { Component, Inject, Input, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { IStationCard } from '../../models';

/**
 * Provide a `displayStationCard` method transforming your object
 * to the required IReportCard properties.
 */
export interface StationProvider<T> {
  displayStationCard(item: T): IStationCard;
}
@Component({
  selector: 'ngx-wxc-station-card-provided',
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
export class NgxWxcStationCardComponentProvided<T> {
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

  constructor(
    /**
     * Mandatory injector that must be provided by the parent component.
     * Ensure the parent component has implemented the method `displayStation`.
     */
    @Inject('StationProvider')
    private readonly _provider: StationProvider<T>
  ) {}

  /**
   * Set the selected station.
   */
  public isSelectedStation(): void {
    this.selectedItem.set(this.item);
  }

  /**
   * Method rendering IStationCard object from the provided one.
   * Must be declared in the parent component.
   */
  public getStation(): IStationCard {
    return this._provider.displayStationCard(this.item);
  }
}
