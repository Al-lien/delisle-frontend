import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PageRedirectService } from '../../services/page-redirect.service';

/**
 * Guard function to handle redirection based on the `PageRedirectService`.
 * Redirects to a "not found" route if redirection is not allowed.
 *
 * @param {ActivatedRouteSnapshot} route - The activated route snapshot.
 * @param {RouterStateSnapshot} state - The router state snapshot, containing the target URL.
 * @returns {boolean} - Returns `true` if the page is redirected successfully, otherwise `false`.
 *
 * Dependencies:
 * - `PageRedirectService`: Determines if the page can be redirected.
 * - `Router`: Used to navigate to the "not found" page when redirection is not allowed.
 *
 * Redirects:
 * - If the redirection is allowed, the guard grants access.
 * - If the redirection is not allowed, navigates to the "not found" route and denies access.
 */
export const onRedirectionGuard: CanActivateFn = (route, state) => {
  const _pageRedirectService = inject(PageRedirectService);
  const _router = inject(Router);

  if (_pageRedirectService.isRedirected()) {
    return true;
  } else {
    _router.navigate(['not-found']);
    return false;
  }
};
