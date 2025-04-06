import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  HttpErrorService,
  IAuthenticationService,
  IUserProfil,
  TokenService,
} from '@ngx-wxc';
import { catchError, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService implements IAuthenticationService {
  private readonly _requestMapping = 'auth';
  private readonly _apiUrl = environment.apiUrl;

  private readonly headers = {
    headers: { 'Content-Type': 'application/json' },
  };

  constructor(
    private readonly _http: HttpClient,
    private readonly _backend: HttpBackend,
    private readonly _httpLogout: HttpClient,
    private readonly _tokenService: TokenService,
    private readonly _httpErrorService: HttpErrorService
  ) {
    /**
     * HttpBackend allows request to ignore interceptors.
     * This way, the token, usually sent by default, is not added to the request.
     */
    this._http = new HttpClient(this._backend);
  }

  public register(newUser: IUserProfil): Observable<IUserProfil> {
    return this._http
      .post<IUserProfil>(
        `${this._apiUrl}/${this._requestMapping}/register`,
        newUser,
        this.headers
      )
      .pipe(catchError(this._httpErrorService.handleError));
  }

  public activateAccount(token: string): Observable<string | void> {
    return this._http
      .get<void>(
        `${this._apiUrl}/${this._requestMapping}/activate-account?token=${token}`
      )
      .pipe(catchError(this._httpErrorService.handleError));
  }

  public login(
    user: Partial<IUserProfil>,
    rememberMe: boolean
  ): Observable<IUserProfil> {
    return this._http
      .post<IUserProfil>(
        `${this._apiUrl}/${this._requestMapping}/authenticate`,
        user,
        this.headers
      )
      .pipe(
        catchError(this._httpErrorService.handleError),
        tap((res) => {
          if ('token' in res) {
            this._tokenService.setToken(res.token as string, rememberMe);
          } else {
            console.error('Unexpected response structure:', res);
          }
        })
      );
  }

  /**
   * It's necessary to send the token while logging out,
   * hence the other instance of HttpClient.
   */
  public logout(): Observable<void> {
    return this._httpLogout
      .post<void>(
        `${this._apiUrl}/${this._requestMapping}/logout`,
        this.headers
      )
      .pipe(
        catchError(this._httpErrorService.handleError),
        tap(() => this._tokenService.removeToken())
      );
  }
}
