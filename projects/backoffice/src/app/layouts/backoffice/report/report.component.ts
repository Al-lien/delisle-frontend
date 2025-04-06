import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  IBIkeStationStat,
  IExceptionResponse,
  InterventionFormTransformer,
  IStationCard,
  IUser,
  StationProvider,
} from '@ngx-wxc';
import { takeUntil } from 'rxjs';
import { Unsub } from '../../../core/abstract/unsub.abstract';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { InterventionsService } from '../../../services/interventions.service';
import { ReportsService } from '../../../services/reports.service';
import { TechniciansService } from '../../../services/technicians.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  /**
   * THIS CLASS IMPLEMENTS A PROVIDER. THIS IS ONLY A TEST AND NOT APPLIED TO ALL COMPONENTS
   * USING THE `StationCard` component.
   */
  providers: [{ provide: 'StationProvider', useExisting: ReportComponent }],
})
/**
 * Class handling list of station's reported incidents by the user.
 * Allow the admin to select a card corresponding to a bike station and create an intervention ticket.
 */
export class ReportComponent
  extends Unsub
  implements OnInit, StationProvider<IBIkeStationStat>
{
  /**
   * @constant interventionForm -> The create intervention form.
   * @constant technicians -> The list of technicians displayed in the select component inside the intervention form.
   * @constant isLoading -> A writable signal to hold the loading state of the page.
   * @constant displayedBikeStations -> An array of displayed station's reports. Dynamic according to admin search in the search input.
   * - initial value populated by a signal listening to the observable making the request to the backend (cf. @constant stationReports 👇 ).
   *
   * @constant stationReports ->  Signal listening to the observable making the http request.
   * @constant selectedStation -> Signal holding the selected station.
   * @constant operatedStation -> Signal holding the selected station on which the admin wants to create an intervention ticket.
   *
   */
  public interventionForm!: FormGroup;
  public technicians: IUser[] = [];
  public isLoading: WritableSignal<boolean> = signal(true);
  public displayedBikeStations: IBIkeStationStat[] = [];
  public stationReports: Signal<IBIkeStationStat[]> = signal([]);

  public selectedStation: WritableSignal<IBIkeStationStat | undefined> =
    signal(undefined);
  public operatedStation: WritableSignal<IBIkeStationStat | null> =
    signal(null);

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _reportsService: ReportsService,
    private readonly _snackbarService: SnackbarService,
    private readonly _technicianService: TechniciansService,
    private readonly _interventionsService: InterventionsService
  ) {
    super();
    this.selectedStation = this._reportsService.selectedStation;
    this.stationReports = this._reportsService._stationReports;
    this.operatedStation = this._interventionsService.operatedStation;
  }

  ngOnInit(): void {
    this.isLoading.set(true);

    this._fetchReports();
    this._fetchTechnicians();

    this.interventionForm = this._fb.nonNullable.group({});
  }

  public displayBikeStations(event: unknown): void {
    this.displayedBikeStations = event as IBIkeStationStat[];
  }

  public displayStationName(station: unknown): string {
    return (station as IBIkeStationStat).name;
  }

  public displayStationCard(station: IBIkeStationStat): IStationCard {
    return {
      id: station?.id,
      title: station.name,
      subtitle: station.commune,
      totalReport: station.totalReports,
      details: [
        { title: 'report-card.last-reports-date', date: station.lastReport },
      ],
    };
  }

  public cancel(): void {
    this.interventionForm = this._fb.nonNullable.group({});
    this.operatedStation.set(null);
  }

  public openForm(): void {
    this._interventionsService.operatedStation.set(
      this.selectedStation() as IBIkeStationStat
    );
  }

  public onCreateIntervention(): void {
    const sanitizedIntervention =
      InterventionFormTransformer.transformToSanitizedForm(
        this.interventionForm.getRawValue()
      );
    this._interventionsService
      .createInterventions(sanitizedIntervention)
      .subscribe({
        error: (err: IExceptionResponse) => {
          this._handleError(err.businessErrorDescription as string);
        },
        complete: () => {
          this.interventionForm.reset();
          this._snackbarService.openSuccess(
            'backoffice-card.intervention-form.snackbar.success'
          );
          this.cancel();
        },
      });
  }

  private _fetchReports(): void {
    this._reportsService.stationReportsObs$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe({
        next: (req) => {
          this.displayedBikeStations = req;
          this.selectedStation.set(this.displayedBikeStations[0]);
        },
        error: (err: IExceptionResponse) => {
          this.displayedBikeStations = [];
          this.selectedStation.set(undefined);
          this.stationReports = signal([]);
          this._handleError(err.businessErrorDescription as string);
        },
      });
  }

  private _fetchTechnicians(): void {
    this._technicianService.techniciansObs$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe({
        next: (req) => {
          this.technicians = req;
        },
        error: (err: IExceptionResponse) => {
          this.technicians = [];
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
