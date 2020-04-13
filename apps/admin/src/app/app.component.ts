import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { GoogleAnalyticsService } from '@hbx/shared/google-analytics';

@Component({
  selector: 'hbx-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private router: Router, private ga: GoogleAnalyticsService) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) =>
        this.ga.sendPage(event.urlAfterRedirects)
      );
  }
}
