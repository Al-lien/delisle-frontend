import { CanActivateFn } from '@angular/router';

export const platformGuard: CanActivateFn = (route, state) => {
  // TODO: REDIRECT USER ACCORDING TO THE PLATFORM THEY'RE IN !
  return true;
};
