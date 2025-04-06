import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '@ngx-wxc';
import { ROUTER_TOKENS } from '../../app-routing.module';
import { RoleRedirectService } from '../../services/role-redirect.service';

/**
 * Guard function to protect routes based on user authentication and role-based access.
 * Redirects users to appropriate routes if unauthorized or unauthenticated.
 *
 * @param {ActivatedRouteSnapshot} route - The activated route snapshot.
 * @param {RouterStateSnapshot} state - The router state snapshot, containing the target URL.
 * @returns {boolean} - Returns `true` if the user can access the route, otherwise `false`.
 *
 * Dependencies:
 * - `Router`: Used to navigate the user to different routes.
 * - `TokenService`: Provides token-related methods, such as retrieving the user's token and role.
 * - `RoleRedirectService`: Checks whether the user has access to the given URL.
 *
 * Redirects:
 * - If the user is authenticated but does not have access to the route, redirects to the `UNAUTHORIZED` route.
 * - If the user is not authenticated, redirects to the `ACCOUNT` route.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);
  const _tokenService = inject(TokenService);
  const _roleRedirectService = inject(RoleRedirectService);

  if (_tokenService.getTokenAndGetRole()) {
    if (!_roleRedirectService.canAccess(state.url)) {
      _router.navigate([ROUTER_TOKENS.UNAUTHORIZED]);
      return false;
    }
    return true;
  } else {
    _router.navigate([ROUTER_TOKENS.ACCOUNT]);
    return false;
  }
};
