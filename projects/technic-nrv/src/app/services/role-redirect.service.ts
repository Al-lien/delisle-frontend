import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IRoleRedirectService, RoleTypeEnum, TokenService } from '@ngx-wxc';
import { ROUTER_TOKENS } from '../app-routing.module';

@Injectable({
  providedIn: 'root',
})
export class RoleRedirectService implements IRoleRedirectService {
  constructor(
    private readonly _router: Router,
    private readonly _tokenService: TokenService
  ) {}

  public redirectAfterLogin(): void {
    const userRole = this._tokenService.getTokenAndGetRole();
    switch (userRole) {
      case RoleTypeEnum.ROLE_ADMIN:
        this._router.navigate([ROUTER_TOKENS.UNAUTHORIZED]);
        break;
      case RoleTypeEnum.ROLE_USER:
        this._router.navigate([ROUTER_TOKENS.UNAUTHORIZED]);
        break;
      case RoleTypeEnum.ROLE_TECHNICIAN:
        this._router.navigate([ROUTER_TOKENS.HOME]);
        break;
      default:
        this._router.navigate([ROUTER_TOKENS.UNAUTHORIZED]);
        break;
    }
  }

  public canAccess(routePath: string): boolean {
    const userRole = this._tokenService.getTokenAndGetRole();
    switch (userRole) {
      case RoleTypeEnum.ROLE_ADMIN:
        return routePath.startsWith('/' + ROUTER_TOKENS.UNAUTHORIZED);
      case RoleTypeEnum.ROLE_TECHNICIAN:
        return routePath.startsWith('/' + ROUTER_TOKENS.INTERVENTIONS);
      case RoleTypeEnum.ROLE_USER:
        return routePath.startsWith('/' + ROUTER_TOKENS.UNAUTHORIZED);
      case RoleTypeEnum.VISITOR:
        return routePath.startsWith('/' + ROUTER_TOKENS.UNAUTHORIZED);
      default:
        return false;
    }
  }
}
