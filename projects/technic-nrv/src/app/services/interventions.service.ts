import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { HttpErrorService } from '@ngx-wxc';
import { catchError, Observable, shareReplay } from 'rxjs';
import { environment } from '../../environments/environment';
import { IInterventionCard } from '../layouts/interventions/interventions.component';
import { IIntervention } from '../shared/models/interventions.model';

@Injectable({
  providedIn: 'root',
})
export class InterventionsService {
  public readonly _technicianRequestMapping = 'technician';
  public readonly _interventionsRequestMapping = 'interventions';

  public selectedIntervention: WritableSignal<IInterventionCard | undefined> =
    signal(undefined);

  public allInterventions$: Observable<IInterventionCard[]> = this._http
    .get<IInterventionCard[]>(
      `${environment.apiUrl}/${this._technicianRequestMapping}/${this._interventionsRequestMapping}/cards`
    )
    .pipe(shareReplay(1), catchError(this._httpErrorService.handleError));

  public _interventions = toSignal(this.allInterventions$, {
    initialValue: [],
  });

  constructor(
    private readonly _http: HttpClient,
    private readonly _httpErrorService: HttpErrorService
  ) {}

  public getIntervention(id: string): Observable<IIntervention> {
    return this._http.get<IIntervention>(
      `${environment.apiUrl}/${this._interventionsRequestMapping}/${id}`
    );
  }
}
