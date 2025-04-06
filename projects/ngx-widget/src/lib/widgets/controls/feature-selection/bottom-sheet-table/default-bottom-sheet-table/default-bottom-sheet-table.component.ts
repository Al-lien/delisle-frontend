import { Component, inject, Inject } from '@angular/core';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { TranslateService } from '@ngx-translate/core';
import { NgxWidgetTableComponent } from '../table';

export interface IBottomSheetTableComponent {
  translatedColumns: string[];
  feature: unknown;
  attrTitle: string;
  tableColumns: [string, string];
}

export type BottomSheetTableComponent = IBottomSheetTableComponent;

@Component({
  selector: 'ngx-widget-default-bottom-sheet-table',
  template: `<ngx-widget-table
    [feature]="feature"
    [displayedColumns]="translatedColumns"
    [title]="attrTitle"
  ></ngx-widget-table>`,
  standalone: true,
  imports: [NgxWidgetTableComponent],
})
export class NgxWidgetDefaultBottomSheetTableComponent
  implements IBottomSheetTableComponent
{
  public translatedColumns!: string[];
  public readonly feature!: unknown;
  public readonly attrTitle!: string;
  public readonly tableColumns!: [string, string];

  private _bottomSheetRef =
    inject<MatBottomSheetRef<BottomSheetTableComponent>>(MatBottomSheetRef);

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: IBottomSheetTableComponent,
    private _translate: TranslateService
  ) {
    this.feature = this.data.feature;
    this.attrTitle = this.data.attrTitle;
    this.tableColumns = this.data.tableColumns ?? [
      'map-view.bottom-sheet.default-table.property',
      'map-view.bottom-sheet.default-table.value',
    ];

    this._translateColumnsTitle();
  }

  public close(): void {
    this._bottomSheetRef.dismiss();
  }

  private _translateColumnsTitle(): void {
    this._translate
      .get(this.tableColumns)
      .subscribe((text) => (this.translatedColumns = Object.values(text)));
  }
}
