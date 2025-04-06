import { ComponentType } from '@angular/cdk/portal';
import { InjectionToken } from '@angular/core';
import {
  IBottomSheetTableComponent,
  NgxWidgetDefaultBottomSheetTableComponent,
} from '../widgets/controls/feature-selection/bottom-sheet-table/default-bottom-sheet-table/default-bottom-sheet-table.component';

export const BOTTOM_SHEET_TABLE_COMPONENT_TOKEN = new InjectionToken<
  ComponentType<IBottomSheetTableComponent>
>('BOTTOM_SHEET_COMPONENT_TOKEN', {
  factory: (): ComponentType<IBottomSheetTableComponent> =>
    NgxWidgetDefaultBottomSheetTableComponent,
});
