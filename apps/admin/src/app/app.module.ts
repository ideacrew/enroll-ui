import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AdminShellModule } from '@hbx/admin/shell';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AdminShellModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
