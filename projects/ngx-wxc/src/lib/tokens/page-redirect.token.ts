import { InjectionToken } from "@angular/core";
import { DefaultPageRedirectService, IPageRedirectService } from "../services/page-redirect.service";

export const PAGE_REDIRECT_SERVICE_TOKEN =
  new InjectionToken<IPageRedirectService>('PAGE_REDIRECT_SERVICE_TOKEN', {
    factory: (): IPageRedirectService => new DefaultPageRedirectService(),
  });
