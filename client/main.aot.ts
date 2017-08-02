import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';

import { AppModuleNgFactory } from './../compiled/client/app/app.module.ngfactory';

if (process.env.NODE_ENV !== 'development') {
  enableProdMode();
}

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
