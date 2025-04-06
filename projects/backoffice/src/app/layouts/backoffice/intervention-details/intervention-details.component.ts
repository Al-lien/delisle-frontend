import {
  Component,
  effect,
  Input,
  OnInit,
  WritableSignal,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  FormEnum,
  IIntervention,
  IInterventionTimespan,
  IncidentTypeTransformer,
  PROFIL_PIC,
  ProgressBarUtils,
  TInterventionForm,
} from '@ngx-wxc';
import { Map } from 'ol';
import { InterventionsService } from '../../../services/interventions.service';
import { MapService } from '../../../services/map.service';

@Component({
  selector: 'app-intervention-details',
  templateUrl: './intervention-details.component.html',
  styleUrl: './intervention-details.component.scss',
  host: {
    class: 'intervention_details_container',
  },
})
export class InterventionDetailsComponent implements OnInit {
  @Input() public interventionForm!: FormGroup<TInterventionForm>;
  public readonly profilPic: string;
  public intervention: WritableSignal<IIntervention | undefined>;
  public map!: Map;

  constructor(
    private readonly _mapService: MapService,
    private readonly _interventionsService: InterventionsService
  ) {
    this.intervention = this._interventionsService.selectedIntervention;

    this.profilPic = PROFIL_PIC[Math.floor(Math.random() * 16)].pic;
    effect(() => {
      this._clearOperationsControls();
      this._initInterventionForm();
    });
  }

  get operations(): FormGroup<{}> {
    return this.interventionForm.controls[FormEnum.OPERATIONS];
  }

  ngOnInit(): void {
    this.map = this._mapService.createMap();
  }

  public displayCoordinates(intervention: any): [number, number] {
    return [intervention.station.lng, intervention.station.lat] as [
      number,
      number
    ];
  }

  // FIX: DATE ARE -1 COMPARED TO ASSIGNEMENT
  public displayRemainingTime(
    intervention: IIntervention | undefined
  ): IInterventionTimespan {
    const start = new Date(intervention?.startsAt as Date);
    const end = new Date(intervention?.endsAt as Date);

    return ProgressBarUtils.getRemainingTimePercentage(start, end);
  }

  public onToggleFormControlName(name: string): string {
    return IncidentTypeTransformer.transformIncidentTypeLabel(name);
  }

  private _initInterventionForm(): void {
    this.interventionForm.addControl(FormEnum.OPERATIONS, new FormGroup({}));
    this._initIncidentTypes();
  }

  private _clearOperationsControls(): void {
    const operationsFormGroup = this.operations as FormGroup;
    if (operationsFormGroup) {
      Object.keys(operationsFormGroup.controls).forEach((key) => {
        operationsFormGroup.removeControl(key);
      });
    }
  }

  private _initIncidentTypes(): void {
    const incidentsList =
      this._interventionsService.selectedIntervention()?.problems;
    const icdFrmGrp = this.interventionForm.controls['operations'];

    if (incidentsList) {
      incidentsList.forEach((icl) => {
        icdFrmGrp.addControl(icl, new FormControl(true));
      });
    }
  }
}
