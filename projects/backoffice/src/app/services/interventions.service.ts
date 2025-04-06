import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  HttpErrorService,
  IBIkeStationStat,
  IIntervention,
  IInterventionSanitized,
} from '@ngx-wxc';
import { catchError, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InterventionsService {
  public readonly _requestMapping = 'admin';

  public readonly operatedStation = signal<IBIkeStationStat | null>(null);

  public selectedIntervention: WritableSignal<IIntervention | undefined> =
    signal(undefined);

  public assignedInterventionsObs$: Observable<IIntervention[]> = this._http
    .get<IIntervention[]>(
      `${environment.apiUrl}/${this._requestMapping}/interventions/assigned`
    )
    .pipe(catchError(this._httpErrorService.handleError));

  public _assignedInterventions = toSignal(this.assignedInterventionsObs$, {
    initialValue: [],
  });

  constructor(
    private readonly _http: HttpClient,
    private readonly _httpErrorService: HttpErrorService
  ) {}

  public createInterventions(
    newIntervention: IInterventionSanitized
  ): Observable<IIntervention> {
    return this._http
      .post<IIntervention>(
        `${environment.apiUrl}/${this._requestMapping}/interventions?station=${
          this.operatedStation()?.id
        }`,
        newIntervention
      )
      .pipe(catchError(this._httpErrorService.handleError));
  }

  public archiveIntervention(interventionId: string): Observable<string> {
    return this._http
      .patch<string>(
        `${environment.apiUrl}/${this._requestMapping}/interventions/archived/${interventionId}`,
        null
      )
      .pipe(catchError(this._httpErrorService.handleError));
  }
}
