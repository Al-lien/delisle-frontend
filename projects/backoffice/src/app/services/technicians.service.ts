import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpErrorService, IUser } from '@ngx-wxc';
import { catchError, Observable, shareReplay } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TechniciansService {
  public readonly _requestMapping = 'admin';

  public techniciansObs$: Observable<IUser[]> = this._http
    .get<IUser[]>(
      `${environment.apiUrl}/${this._requestMapping}/technician/all`
    )
    .pipe(shareReplay(1), catchError(this._httpErrorService.handleError));

  constructor(
    private readonly _http: HttpClient,
    private readonly _httpErrorService: HttpErrorService
  ) {}
}
