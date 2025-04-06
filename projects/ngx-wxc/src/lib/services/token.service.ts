import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, WritableSignal } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { isNil } from 'lodash-es';

export enum RoleTypeEnum {
  ROLE_USER = 'ROLE_USER',
  ROLE_TECHNICIAN = 'ROLE_TECHNICIAN',
  ROLE_ADMIN = 'ROLE_ADMIN',
  VISITOR = 'VISITOR',
}

export type RoleType = keyof typeof RoleTypeEnum;

export enum jwtToken {
  _key = 'jwtToken',
}

export interface IJwtToken {
  authorities: string[];
  fullname: string;
  exp: number;
  iat: number;
  sub: string;
}

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  public USER_ROLE!: WritableSignal<RoleType | null>;

  constructor(@Inject(PLATFORM_ID) private readonly platformId: object) {}

  /**
   * Get the token from the navigator storage :
   * - localStorage or sessionStorage
   *
   * As the application is Server-Side-Rendered,
   * it's mandatory to check that the client browser's is loaded ! (hence the `isPlatformBrowser?`)
   * @returns the encoded token or null if not
   */
  public getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return (
        localStorage.getItem(jwtToken._key) ??
        sessionStorage.getItem(jwtToken._key)
      );
    }
    return null;
  }

  /**
   * Stores the token in the navigator storage.
   * If user choose the "remember me" option when login :
   *  - stored in the localStorage (persistence)
   * Otherwise :
   *  - sessionStorage (deleted after tab closed)
   * @param token : jwt token send by the server
   * @param rememberMe : if the user want to stay connect or not
   */
  public setToken(token: string, rememberMe: boolean): void {
    if (isNil(token)) {
      return;
    }

    if (rememberMe) {
      return localStorage.setItem(jwtToken._key, token);
    }

    return sessionStorage.setItem(jwtToken._key, token);
  }

  /**
   * Delete token from localStorage and sessionStorage after the user logs out.
   * User might have signed in with `remember me` option.
   * In that case, token is stored in localStorage, otherwise, in the sessionStorage.
   * This way it insures the token is well removed.
   */
  public removeToken(): void {
    localStorage.removeItem(jwtToken._key);
    sessionStorage.removeItem(jwtToken._key);
  }

  /**
   * Get the jwt token stored in the navigator storage (if present) and retrieve
   * the user's role. This method is used to redirect the user on the right path according to it's role.
   * @returns the user's role {@link RoleType} and {@link RoleTypeEnum.VISITOR} as default
   */
  public getTokenAndGetRole(): RoleType | null {
    if (this.getToken()) {
      const decodedToken = this.decodeToken(this.getToken() as string);
      return this.getUserRole(decodedToken as IJwtToken);
    }
    return RoleTypeEnum.VISITOR;
  }

  /**
   * Get the jwt token stored in the navigator storage (if present) and retrieve
   * the user's fullname.
   * @returns the user's fullname or 'nom introuvable' as default.
   */
  public getTokenAndGetFullname(): string {
    if (this.getToken()) {
      const decodedToken = this.decodeToken(this.getToken() as string);
      return decodedToken ? decodedToken.fullname : 'nom introuvable';
    }
    return 'nom introuvable';
  }

  /**
   * Decode the jwt provided by the server (with JwtModule from @auth0)
   * @param token : the token provided by the server
   * @returns a decoded token {@link IJwtToken}
   */
  public decodeToken(token: string): IJwtToken | null {
    return new JwtHelperService().decodeToken(token);
  }

  /**
   * Find the user's role encoded in the jwt provided by the server
   * @param decodedToken : the decoded token (with JwtModule from @auth0)
   * @returns the role of the connected user {@link RoleType}
   */
  public getUserRole(decodedToken: IJwtToken): RoleType {
    return (
      decodedToken.authorities.find((r): r is RoleType =>
        Object.values(RoleTypeEnum).includes(r as RoleTypeEnum)
      ) ?? RoleTypeEnum.VISITOR
    );
  }
}
