import { ComponentType } from '@angular/cdk/portal';
import { Inject, Injectable } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { BOTTOM_SHEET_TABLE_COMPONENT_TOKEN } from '../../../../tokens/bottom-sheet-table.token';
import { IBottomSheetTableComponent } from './default-bottom-sheet-table/default-bottom-sheet-table.component';

export interface IBottomSheetService {
  openTable(data: unknown): MatBottomSheetRef<unknown>;
}

@Injectable({
  providedIn: 'root',
})
export class DefaultBottomSheetTableService implements IBottomSheetService {
  constructor(
    @Inject(BOTTOM_SHEET_TABLE_COMPONENT_TOKEN)
    private _bottomSheetModal: ComponentType<IBottomSheetTableComponent>,
    private _bottomSheet: MatBottomSheet
  ) {}

  public openTable(
    feature: unknown,
    attrTitle?: string,
    tableColumns?: string[]
  ): MatBottomSheetRef<unknown> {
    return this._bottomSheet.open(this._bottomSheetModal, {
      data: {
        feature,
        attrTitle,
        tableColumns,
      },
    });
  }
}
