import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { HttpErrorService, IBIkeStationStat, IUserSanitized } from '@ngx-wxc';
import { catchError, Observable, shareReplay } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  public readonly _requestMapping = 'admin';

  public selectedStation: WritableSignal<IBIkeStationStat | undefined> =
    signal(undefined);

  public selectedTechnician: WritableSignal<IUserSanitized | undefined> =
    signal(undefined);

  public stationReportsObs$: Observable<IBIkeStationStat[]> = this._http
    .get<IBIkeStationStat[]>(
      `${environment.apiUrl}/${this._requestMapping}/incident/all/stats`
    )
    .pipe(shareReplay(1), catchError(this._httpErrorService.handleError));

  public _stationReports = toSignal(this.stationReportsObs$, {
    initialValue: [],
  });

  constructor(
    private readonly _http: HttpClient,
    private readonly _httpErrorService: HttpErrorService
  ) {}
}
