import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IRoleRedirectService, RoleTypeEnum, TokenService } from '@ngx-wxc';
import { ROUTER_TOKENS } from '../app-routing.module';

@Injectable({
  providedIn: 'root',
})
/**
 * Service for handling role-based redirection and access control.
 */
export class RoleRedirectService implements IRoleRedirectService {
  /**
   * Initializes the service with dependencies.
   *
   * @param {Router} _router - Angular's Router for navigation.
   * @param {TokenService} _tokenService - Service to retrieve the user's token and role.
   */
  constructor(
    private readonly _router: Router,
    private readonly _tokenService: TokenService
  ) {}

  /**
   * Redirects the user to the appropriate page based on their role after login.
   *
   * Redirects:
   * - `ROLE_ADMIN` -> Back Office.
   * - `ROLE_USER`, `ROLE_TECHNICIAN`, and other roles -> Unauthorized page.
   */
  public redirectAfterLogin(): void {
    const userRole = this._tokenService.getTokenAndGetRole();
    switch (userRole) {
      case RoleTypeEnum.ROLE_ADMIN:
        this._router.navigate([ROUTER_TOKENS.BACK_OFFICE]);
        break;
      case RoleTypeEnum.ROLE_USER:
      case RoleTypeEnum.ROLE_TECHNICIAN:
      default:
        this._router.navigate([ROUTER_TOKENS.UNAUTHORIZED]);
        break;
    }
  }

  /**
   * Determines if the user can access a given route based on their role.
   *
   * @param {string} routePath - The path of the route to check.
   * @returns {boolean} - Returns `true` if the user can access the route, otherwise `false`.
   *
   * Access Control:
   * - `ROLE_ADMIN` -> Routes starting with `/BACK_OFFICE`.
   * - `ROLE_TECHNICIAN` -> Routes starting with `/TECHNICIANS`.
   * - `ROLE_USER`, `VISITOR` -> Routes starting with `/WELCOME`.
   * - Other roles -> No access.
   */
  public canAccess(routePath: string): boolean {
    const userRole = this._tokenService.getTokenAndGetRole();
    switch (userRole) {
      case RoleTypeEnum.ROLE_ADMIN:
        return routePath.startsWith('/' + ROUTER_TOKENS.BACK_OFFICE);
      case RoleTypeEnum.ROLE_TECHNICIAN:
        return routePath.startsWith('/' + ROUTER_TOKENS.TECHNICIANS);
      case RoleTypeEnum.ROLE_USER:
      case RoleTypeEnum.VISITOR:
        return routePath.startsWith('/' + ROUTER_TOKENS.WELCOME);
      default:
        return false;
    }
  }
}
