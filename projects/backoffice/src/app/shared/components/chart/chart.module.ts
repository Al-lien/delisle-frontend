import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { ChartComponent } from './chart.component';

@NgModule({
  declarations: [ChartComponent],
  exports: [ChartComponent],
  imports: [CommonModule, ChartjsComponent],
})
export class ChartModule {}
