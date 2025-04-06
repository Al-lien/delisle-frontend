import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import {
  DefaultDialogService,
  IExceptionResponse,
  IIntervention,
  IStationCard,
} from '@ngx-wxc';
import { takeUntil } from 'rxjs';
import { Unsub } from '../../../core/abstract/unsub.abstract';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { InterventionsService } from '../../../services/interventions.service';
import { AssignedUtils } from './assigned.utils';

@Component({
  selector: 'app-assigned',
  templateUrl: './assigned.component.html',
  styleUrl: './assigned.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignedComponent extends Unsub implements OnInit {
  public interventionForm!: FormGroup;
  public displayedInterventions: IIntervention[] = [];
  public isLoading: WritableSignal<boolean> = signal(true);
  public interventions: WritableSignal<IIntervention[]> = signal([]);
  public selectedIntervention: WritableSignal<IIntervention | undefined> =
    signal(undefined);

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _snackbarService: SnackbarService,
    private readonly _dialogService: DefaultDialogService,
    private readonly _interventionService: InterventionsService
  ) {
    super();
    this.selectedIntervention = this._interventionService.selectedIntervention;
    this.interventions.set(this._interventionService._assignedInterventions());
    setTimeout(() => {
      console.log(this.interventions());
    }, 2000);
  }

  ngOnInit(): void {
    this.isLoading.set(true);
    this._fetchAssignedInterventions();
    this.interventionForm = this._fb.nonNullable.group({});
  }

  public displayInterventions(event: unknown): void {
    this.displayedInterventions = event as IIntervention[];
  }

  public displayStationName(intervention: unknown): string {
    return (intervention as IIntervention).station?.name;
  }

  public displayStationCard(intervention: IIntervention): IStationCard {
    return {
      id: intervention.id,
      title: intervention.station.name,
      subtitle: intervention.station.commune,
      totalReport: intervention.problems.length,
      details: [
        {
          title: 'intervention-card.attribution-date',
          date: intervention.startsAt,
        },
        { title: 'intervention-card.deadline', date: intervention.endsAt },
      ],
    };
  }

  public onArchiveIntervention(intervention: IIntervention | undefined): void {
    if (intervention === undefined) {
      return this._snackbarService.openError(
        'backoffice-card.archive-intervention-details.not-found'
      );
    }

    const { title, content, subtitle, close, actions } =
      AssignedUtils.archiveInterventionDialog;

    this._dialogService
      .openDialog(title, content, subtitle, close, actions)
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this._archiveIntervention(intervention.id);
        }
      });
  }

  private _archiveIntervention(id: string): void {
    this._interventionService.archiveIntervention(id).subscribe({
      error: (err: IExceptionResponse) => {
        this._handleError(err.businessErrorDescription as string);
      },
      complete: () => {
        this._snackbarService.openSuccess(
          'backoffice-card.intervention-form.snackbar.success'
        );
        this._fetchAssignedInterventions();
      },
    });
  }

  private _fetchAssignedInterventions(): void {
    this._interventionService.assignedInterventionsObs$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe({
        next: (req) => {
          this.interventions.set(req);
          this.displayedInterventions = req;
          this.selectedIntervention.set(req[0]);
        },
        error: (err: IExceptionResponse) => {
          this.interventions = signal([]);
          this.displayedInterventions = [];
          this.selectedIntervention.set(undefined);
          this._handleError(err.businessErrorDescription as string);
        },
        complete: () => this.isLoading.set(false),
      });
  }

  private _handleError(error: string): void {
    console.error('Error fetching stations:', error);
    this._snackbarService.openError(error);
  }
}
