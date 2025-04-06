import { Component, OnInit, WritableSignal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  BikestationTransformer,
  IBIkeStationStat,
  IncidentTypeTransformer,
  IPaginatedSnapshot,
} from '@ngx-wxc';
import { ChartOptions } from 'chart.js';
import { isNil } from 'lodash-es';
import { Map } from 'ol';
import { IDataset } from '../../../models/dataset.model';
import { MapService } from '../../../services/map.service';
import { ReportsService } from '../../../services/reports.service';

@Component({
  selector: 'app-station-details',
  templateUrl: './station-details.component.html',
  styleUrl: './station-details.component.scss',
  host: {
    class: 'station_details_container',
  },
})
export class StationDetailsComponent implements OnInit {
  public station: WritableSignal<IBIkeStationStat | undefined>;
  public chartOptions!: ChartOptions;
  public title!: string;
  public map!: Map;

  constructor(
    private readonly _mapService: MapService,
    private readonly _translate: TranslateService,
    private readonly _reportsService: ReportsService
  ) {
    this.station = this._reportsService.selectedStation;

    if (this.station() === undefined) {
      this.station.set(this._initDefaultStation());
    }
  }

  ngOnInit(): void {
    this._translate
      .get('backoffice-card.sections.chart.title')
      .subscribe((value) => (this.title = value));

    this.chartOptions = this._initChartOptions();
    this.map = this._mapService.createMap();
  }

  public displaySnapshots(
    station: IBIkeStationStat | undefined
  ): IPaginatedSnapshot[] | undefined {
    return station?.incidentSnapshots;
  }

  public displayCoordinates(station: unknown): [number, number] {
    if (
      isNil((station as IBIkeStationStat).lng) ||
      isNil((station as IBIkeStationStat).lat)
    ) {
      return [0, 0];
    }

    const _ = station as IBIkeStationStat;
    return [_.lng as number, _.lat as number];
  }

  /**
   * Initialize the dataset for the displayed chart.
   * Or return a default dataset in case of no data.
   *
   * @param station : the station which data will be used
   * @returns an array of dataset {@link IDataset[]}
   */
  public initDatasets(station: IBIkeStationStat | undefined): IDataset[] {
    return [
      {
        type: 'bar',
        label: this.title,
        backgroundColor: '#e20612',
        barThickness: 20,
        maxBarThickness: 25,
        data: station?.incidentStats.map((stat) => ({
          x: stat.incident,
          y: stat.numberOfReport + Math.floor(Math.random() * 50),
        })),
      },
    ] as IDataset[];
  }

  private _initChartOptions(): ChartOptions {
    return {
      scales: {
        y: {
          display: false,
        },
        x: {
          ticks: {
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            title: (context: any): string => {
              return this._translateStationIncidentType(context[0].label);
            },
          },
          enabled: true,
          backgroundColor: 'rgba(28, 46, 66, 0.8)',
          displayColors: false,
        },
      },
    };
  }

  /**
   * Get the corresponding translated path to the displayed label on the chart.
   * @param label : ENUM displayed on the y axis.
   * @returns the translated value of the label.
   */
  private _translateStationIncidentType(label: string): string {
    const translatePath =
      IncidentTypeTransformer.transformIncidentTypeLabel(label);
    let translatedLabel = '';
    this._translate.get(translatePath).subscribe((x) => (translatedLabel = x));
    return translatedLabel;
  }

  /**
   * Sanitized bike station if undefined.
   * @returns a sanitized version of the bike station stat.
   */
  private _initDefaultStation(): IBIkeStationStat {
    return BikestationTransformer.transformToDefaultSanitized();
  }
}
