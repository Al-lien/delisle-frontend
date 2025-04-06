import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
  MatOption,
} from '@angular/material/autocomplete';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { map, Observable, startWith } from 'rxjs';

// TODO: lot of thing to do to improve this component :
// - reactivity to text change after selection (when deleting letters for example).
// - real usage of a provided FormControl.
// - more independency : (optionLabel fn should be inside this component).
@Component({
  selector: 'ngx-wxc-search-bar',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    AsyncPipe,
    MatIconModule,
    TranslateModule,
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'fill' },
    },
  ],
})

/**
 * Search input component with autocomplete functionality.
 * Allows for filtering items of type unknown and dynamically displaying filtered results.
 *
 * Displays the item of type unknown as a string using the provided `optionLabel`.
 * Allows to pass item with different interface
 */
export class NgxWxcSearchBarComponent implements OnInit {
  @ViewChild(MatOption) public autoComplete!: MatAutocomplete;

  /**
   * An event emitter that emits the filtered items of type unknown.
   */
  @Output() public filteredItems: EventEmitter<unknown[]> = new EventEmitter<
    unknown[]
  >();
  @Output() public onSelected: EventEmitter<unknown> =
    new EventEmitter<unknown>();

  /**
   * The key in the object provided (see above : `items`) whose value while be displayed as option.
   */
  @Input() public attributeDisplay!: string;
  /**
   * The list of items of type unknown that will be filtered and displayed in the autocomplete dropdown.
   */
  @Input() public items: unknown[] = [];
  /**
   * The label of the field.
   */
  @Input() public label: string = '';
  /**
   * A writable signal to hold the selected item of type unknown.
   */
  @Input() public selectedItem$: WritableSignal<unknown> = signal(undefined);
  /**
   * The form control used for handling the search input value.
   */
  public searchControl: FormControl<unknown>;
  /**
   * An observable that holds the filtered options of type unknown.
   */
  public filteredOptions!: Observable<unknown[]>;

  constructor() {
    this.filteredItems = new EventEmitter<unknown[]>();
    this.searchControl = new FormControl<unknown>('');
  }
  /**
   *  Defines how to display an item of type unknown as a string value.
   * - @param  item The item of type unknown to display.
   * - @returns The string representation of the item. (e.g `return unknownObject.objectKey`)
   */
  @Input() public optionLabel: (item: unknown) => string = () => '';

  ngOnInit(): void {
    this.filteredOptions = this._filterOptions();
    this.filteredOptions.subscribe((option) => this.filteredItems.emit(option));
  }

  /**
   * Handles the event when an option is selected from the autocomplete dropdown.
   * Sets the selected item in the `selectedItem$` signal.
   *
   * @param $event - The autocomplete selection event. (Material built-in directive)
   */
  public onOptionSelected($event: MatAutocompleteSelectedEvent): void {
    const selectedItem = $event.option.value as unknown;
    this.searchControl.setValue(selectedItem);
    this.selectedItem$.set(selectedItem);
    this.onSelected.emit(selectedItem);
  }

  /**
   * Filters the options based on the input value in the form control.
   * If the value is a string, it applies the filter based on the string value.
   * If the value is an item, it uses the display function to filter.
   *
   * @returns An observable that contains the filtered items of type unknown.
   */
  private _filterOptions(): Observable<unknown[]> {
    return this.searchControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const filterValue =
          typeof value === 'string' ? value : this.optionLabel(value);
        return filterValue
          ? this._filter(filterValue as string)
          : this.items.slice();
      })
    );
  }

  /**
   * Filters the list of items based on the provided filter value.
   * Converts the filter value to lowercase and compares it to the string representation of each item.
   *
   * @param filterValue - The string value to filter the items by.
   * @returns The list of filtered items of type unknown.
   */
  private _filter(filterValue: string): unknown[] {
    const loweredFilterValue = filterValue.toLowerCase();

    return this.items.filter((item) =>
      this.optionLabel(item).toLowerCase().includes(loweredFilterValue)
    );
  }
}
