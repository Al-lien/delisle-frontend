import {
  Component,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IExceptionResponse, IStationCard, TokenService } from '@ngx-wxc';
import { takeUntil, tap } from 'rxjs';
import { Unsub } from '../../core/abstract/unsub.abstract';
import { InterventionsService } from '../../services/interventions.service';

export interface IInterventionCard {
  id: string;
  station: string;
  commune: string;
  problemsNbr: number;
  attributedAt: Date;
  deadline: Date;
}

@Component({
  selector: 'app-interventions',
  templateUrl: './interventions.component.html',
  styleUrl: './interventions.component.scss',
})
export class InterventionsComponent extends Unsub implements OnInit {
  public displayedIntervention: IInterventionCard[];
  public fullname: string;
  public interventions: Signal<IInterventionCard[]>;
  public isLoading: WritableSignal<boolean>;
  public selectedIntervention: WritableSignal<IInterventionCard | undefined>;

  constructor(
    private readonly _interventionService: InterventionsService,
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
    private readonly _tokenService: TokenService
  ) {
    super();
    this.displayedIntervention = [];
    this.fullname = this._tokenService.getTokenAndGetFullname();
    this.interventions = signal([]);
    this.isLoading = signal(true);
    this.selectedIntervention = this._interventionService.selectedIntervention;
  }

  ngOnInit(): void {
    this.isLoading.set(true);

    this._fetchInterventions();
  }

  public displayReport(station: IInterventionCard): IStationCard {
    return {
      id: station?.id,
      title: station.station,
      subtitle: station.commune,
      totalReport: station.problemsNbr,
      details: [
        {
          title: 'report-card.last-reports-date',
          date: station.attributedAt,
        },
        { title: 'report-card.last-reports-date', date: station.deadline },
      ],
    };
  }

  public openIntervention(interventionId: string): void {
    this._router.navigate([`${interventionId}`], {
      relativeTo: this._route,
    });
  }

  private _fetchInterventions(): void {
    this._interventionService.allInterventions$
      .pipe(takeUntil(this._unsubscribe$), tap(console.log))
      .subscribe({
        next: (req) => {
          this.displayedIntervention = req;
          this.selectedIntervention.set(this.displayedIntervention[0]);
        },
        error: (err: IExceptionResponse) => {
          this.displayedIntervention = [];
          this.selectedIntervention.set(undefined);
          this.interventions = signal([]);
          this._handleError(err.businessErrorDescription as string);
        },
        complete: () => this.isLoading.set(false),
      });
  }

  private _handleError(error: string): void {
    console.error('Error fetching stations:', error);
  }
}
