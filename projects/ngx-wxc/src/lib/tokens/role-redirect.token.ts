import { InjectionToken } from "@angular/core";
import { DefaultRoleRedirectService, IRoleRedirectService } from "../services/role-redirect.service";

export const ROLE_REDIRECT_SERVICE_TOKEN =
  new InjectionToken<IRoleRedirectService>('ROLE_REDIRECT_SERVICE_TOKEN', {
    factory: (): IRoleRedirectService => new DefaultRoleRedirectService(),
  });
