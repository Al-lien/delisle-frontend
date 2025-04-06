import { NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'ngx-widget-table',
  standalone: true,
  imports: [NgStyle, MatTableModule],
  templateUrl: './table.component.html',
  styles: ['h2 {margin-block: 0.5rem 0} th {font-weight: bold}'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Two rows table component.
 * Display all the values of a provided object except the function that could be in it.
 * If the object contains nested objects, those are flatten and displayed with the following syntax :
 *  - name.nestedname.nestednestedname.etc... : value
 */
export class NgxWidgetTableComponent {
  /**
   * An array of keys that should not be displayed. None by default.
   */
  @Input() public excludedKeys: string[] = [];

  /**
   * Name of the two displayed columns.
   */
  @Input() public displayedColumns!: string[];

  /**
   * The items which values would be displayed.
   */
  @Input() public feature!: unknown;

  /**
   * @optional Title of the table.
   */
  @Input() public title?: string;

  /**
   * Flattened representation of the input data structure.
   * Converts nested objects into a single-level structure.
   * @return a one level object.
   */
  public get featureProperties(): Record<string, unknown> {
    return this._flattenObject(this.feature);
  }

  /**
   * Array of keys from the flattened data structure.
   * Filters out any keys present in `excludedKeys`.
   * Keys are sorted alphabetically.
   * @returns an array of the keys of the provided object that will be displayed.
   */
  public get featurePropertiesKeys(): string[] {
    return Object.keys(this._flattenObject(this.feature))
      .filter((key) => {
        const find = this.excludedKeys.find((eKey) => {
          return RegExp(eKey).exec(key);
        });
        return find === undefined;
      })
      .sort((a, b) => a.localeCompare(b));
  }

  /**
   * Helper method to flatten a nested object.
   *
   * @param  obj The input object to be flattened.
   * @param parentKey Base key prefix, used for nested keys.
   * @param result Accumulator for the resulting flattened object.
   *
   * @returns {Object.<string, unknown>} Flattened object with dot notation for nested keys.
   */
  private _flattenObject(
    obj: any,
    parentKey = '',
    result: Record<string, unknown> = {}
  ): Record<string, unknown> {
    for (const key in obj) {
      if (Object.hasOwn(obj, key)) {
        const fullKey = parentKey ? `${parentKey}.${key}` : key;

        if (typeof obj[key] === 'object' && obj[key] !== null) {
          this._flattenObject(obj[key], fullKey, result);
        } else if (typeof obj[key] !== 'function') {
          result[fullKey] = obj[key];
        }
      }
    }
    return result;
  }
}
