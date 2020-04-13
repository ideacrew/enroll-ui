import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AdminShellModule } from '@hbx/admin/shell';
import { TRACKING_ID } from '@hbx/shared/google-analytics';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AdminShellModule,
  ],
  providers: [
    {
      provide: TRACKING_ID,
      useValue: environment.trackingId,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
