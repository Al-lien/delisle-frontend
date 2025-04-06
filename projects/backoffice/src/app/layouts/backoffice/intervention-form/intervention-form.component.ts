import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  WritableSignal,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  FormEnum,
  IBIkeStationStat,
  IncidentTypeTransformer,
  IUser,
  IUserSanitized,
  TInterventionForm,
  UserTransformer,
} from '@ngx-wxc';
import { InterventionsService } from '../../../services/interventions.service';

@Component({
  selector: 'app-intervention-form',
  templateUrl: './intervention-form.component.html',
  styleUrl: './intervention-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InterventionFormComponent implements OnInit {
  @Input() public interventionForm!: FormGroup<TInterventionForm>;
  @Input() public selectedStation!: WritableSignal<
    IBIkeStationStat | undefined
  >;
  @Input() public technicians!: IUser[];

  public displayedTechnicians: IUserSanitized[] = [];

  constructor(private readonly _interventionsService: InterventionsService) {}

  get technician(): FormControl<string | null> {
    return this.interventionForm.controls[FormEnum.TECHNICIAN];
  }

  get timelapse(): FormGroup<{
    startsAt: FormControl<Date | null>;
    endsAt: FormControl<Date | null>;
  }> {
    return this.interventionForm.controls[FormEnum.TIMELAPSE];
  }

  get operations(): FormGroup<{}> {
    return this.interventionForm.controls[FormEnum.OPERATIONS];
  }

  get description(): FormControl<string | null> {
    return this.interventionForm.controls[FormEnum.COMMENT];
  }

  ngOnInit(): void {
    this._initInterventionForm();
    this.displayedTechnicians = this.technicians.map((t) =>
      UserTransformer.transformToSanitizedUser(t)
    );
  }

  public onToggleFormControlName(name: string): string {
    return IncidentTypeTransformer.transformIncidentTypeLabel(name);
  }

  private _initInterventionForm(): void {
    this.interventionForm.addControl(
      FormEnum.TECHNICIAN,
      new FormControl('', Validators.required)
    );
    this.interventionForm.addControl(
      FormEnum.TIMELAPSE,
      new FormGroup({
        [FormEnum.STARTS_AT]: new FormControl(new Date(), Validators.required),
        [FormEnum.ENDS_AT]: new FormControl(new Date(), Validators.required),
      })
    );
    this.interventionForm.addControl(FormEnum.OPERATIONS, new FormGroup({}));
    this.interventionForm.addControl(
      FormEnum.COMMENT,
      new FormControl('', [Validators.required, Validators.minLength(10)])
    );

    this._initIncidentTypes();
  }

  private _initIncidentTypes(): void {
    const operationList =
      this._interventionsService.operatedStation()?.incidentStats;
    const oprFrmGrp = this.interventionForm.controls['operations'];

    if (operationList) {
      operationList.forEach((opr) => {
        oprFrmGrp.addControl(
          opr.incident,
          new FormControl(opr.numberOfReport > 0)
        );
      });
    }
  }
}
