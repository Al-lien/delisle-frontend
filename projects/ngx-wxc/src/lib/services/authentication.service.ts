import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IUserProfil } from '../models/user.model';

export interface IAuthenticationService {
  register(newUser: IUserProfil): Observable<string | IUserProfil>;
  activateAccount(token: string): Observable<string | void>;
  login(
    user: Partial<IUserProfil>,
    rememberMe: boolean
  ): Observable<string | IUserProfil>;
  logout(): Observable<void>;
}

export type AuthenticationService = IAuthenticationService;

@Injectable({
  providedIn: 'root',
})
export class DefaultAuthenticationService implements IAuthenticationService {
  public register(newUser: IUserProfil): Observable<string | IUserProfil> {
    return of(newUser);
  }

  public activateAccount(token: string): Observable<string | void> {
    return of(token);
  }

  public login(
    user: Partial<IUserProfil>,
    rememberMe: boolean
  ): Observable<string | IUserProfil> {
    return of('');
  }

  public logout(): Observable<void> {
    return of();
  }
}
