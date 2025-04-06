import { Injectable } from '@angular/core';

export interface IRoleRedirectService {
  redirectAfterLogin(): void;
  canAccess(routePath: string): boolean;
}

export type RoleRedirectService = IRoleRedirectService;

@Injectable({
  providedIn: 'root',
})
export class DefaultRoleRedirectService implements IRoleRedirectService {
  public redirectAfterLogin(): void {
    return;
  }

  public canAccess(routePath: string): boolean {
    return false;
  }
}
