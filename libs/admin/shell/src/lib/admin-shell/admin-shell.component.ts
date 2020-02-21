import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { AuthService } from '@hbx/auth';

@Component({
  selector: 'hbx-admin-shell',
  templateUrl: './admin-shell.component.html',
  styleUrls: ['./admin-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminShellComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.setToken(this.getTokenFromUrl());
  }

  getTokenFromUrl(): string {
    if (window.location.search.length > 0) {
      // console.log(`Looks like there's a token in the URL, grabbing it`);
      // What if this token is just made up?
      const search = document.location.search.substring(1);

      // Find the equals sign, take what's after it
      const equalsIndex = search.indexOf('=');
      return search.substring(equalsIndex + 1);
    }

    return null;
  }
}
