import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  IInterventionTimespan,
  IncidentTypeEnum,
  IncidentTypeTransformer,
  NgxWxcMapService,
  ProgressBarUtils,
  TInterventionForm,
} from '@ngx-wxc';
import { isNil } from 'lodash-es';
import { Feature, Map } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { Point } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { tap } from 'rxjs';
import { InterventionsService } from '../../services/interventions.service';
import { IIntervention } from '../../shared/models/interventions.model';
import { markerPoint } from './intervention-details.consts';

@Component({
  selector: 'app-intervention-details',
  templateUrl: './intervention-details.component.html',
  styleUrl: './intervention-details.component.scss',
})
export class InterventionDetailsComponent implements OnInit {
  public intervention: IIntervention | undefined;
  public interventionForm!: FormGroup<TInterventionForm>;
  public operationControls!: FormGroup<{}>;
  public map!: Map;
  private readonly _interventionId: string | null;
  private readonly _vectorLayer: VectorLayer;

  constructor(
    private readonly _mapService: NgxWxcMapService,
    private readonly _location: Location,
    private readonly _interventionService: InterventionsService,
    private readonly _route: ActivatedRoute
  ) {
    this.intervention = undefined;
    this.operationControls = new FormGroup({});
    this._interventionId = this._route.snapshot.paramMap.get('id');
    this.map = this._mapService.createMap();
    this._vectorLayer = new VectorLayer({
      source: new VectorSource(),
    });
  }

  ngOnInit(): void {
    if (!isNil(this._interventionId)) {
      this._interventionService
        .getIntervention(this._interventionId)
        .pipe(
          tap((intervention) => this._setMapCenter(intervention)),
          tap((intervention) => this._initIncidentTypes(intervention.problems))
        )
        .subscribe({
          next: (res) => (this.intervention = res),
        });
    }
  }

  public goBack(): void {
    this._location.back();
  }

  public reportIssue(): void {
    console.log('REPORTING ISSUE');
  }

  public onHeaderBtnClick(station: string | undefined): void {
    console.log(station);
  }

  public displayRemainingTime(
    intervention: IIntervention | undefined
  ): IInterventionTimespan {
    const start = new Date(intervention?.startsAt as Date);
    const end = new Date(intervention?.endsAt as Date);

    return ProgressBarUtils.getRemainingTimePercentage(start, end);
  }

  // TODO: MOVE TO NGX
  public onToggleFormControlName(name: string): string {
    return IncidentTypeTransformer.transformIncidentTypeLabel(name);
  }

  private _initIncidentTypes(problems: IncidentTypeEnum[]): void {
    problems.forEach((opr) => {
      this.operationControls.addControl(opr, new FormControl(false));
    });

    console.log(this.operationControls.value);
  }

  private _setMapCenter(intervention: IIntervention): void {
    const station = intervention.station;

    if (isNil(station)) {
      return;
    }

    this.map
      .getView()
      .animate({ center: [station?.lng, station?.lat], duration: 500 }, () =>
        this._setMarkerPoint()
      );
  }

  private _setMarkerPoint(): void {
    const center: Coordinate = this.map.getView().getCenter() as Coordinate;

    if (!this.map.getLayers().getArray().includes(this._vectorLayer)) {
      this.map.addLayer(this._vectorLayer);
    }

    const vectorSource = this._vectorLayer.getSource();
    vectorSource?.clear();

    const pointFeature = new Feature({
      geometry: new Point(center),
    });

    pointFeature.setStyle(markerPoint);

    vectorSource?.addFeature(pointFeature);
  }
}
