import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
// Angular4 fix
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent }  from './app.component';

/**
 * The bootstrapper module
 */
@NgModule({
  imports:      [
    BrowserModule,
    HttpModule,
    NoopAnimationsModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
