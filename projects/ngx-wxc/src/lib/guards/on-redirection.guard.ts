import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DefaultPageRedirectService } from '../services/page-redirect.service';

export const onRedirectionGuard: CanActivateFn = (route, state) => {
  const _pageRedirectService = inject(DefaultPageRedirectService);
  const _router = inject(Router);

  if (_pageRedirectService.isRedirected()) {
    return true;
  } else {
    _router.navigate(['not-found']);
    return false;
  }
};
