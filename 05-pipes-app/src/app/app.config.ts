import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { registerLocaleData } from '@angular/common';

import localeEs from '@angular/common/locales/es-MX';
import localePt from '@angular/common/locales/pt';
import { LocalService } from './services/locale-service';

registerLocaleData(localeEs, 'es');
registerLocaleData(localePt, 'fr');

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),

    {
      provide: LOCALE_ID,
      // useValue: 'pt',
      deps: [LocalService],
      useFactory: (localeService: LocalService) => localeService.getLocale,
    }
  ]
};
