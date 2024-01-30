import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { AuthService } from '@hbx/auth';
import { UserFacade, loadUser } from '@hbx/user/store';
import {
  ToastsFacade,
  dismissToast,
  addToast,
  ToastType,
} from '@hbx/shared/notifications/toasts';

@Component({
  selector: 'hbx-admin-shell',
  templateUrl: './admin-shell.component.html',
  styleUrls: ['./admin-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminShellComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private userFacade: UserFacade,
    public toastsFacade: ToastsFacade
  ) {}

  ngOnInit(): void {
    this.authService.setToken(
      this.getTokenFromLocalStorage()
    );
    this.userFacade.dispatch(loadUser());
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

    return undefined;
  }

  getTokenFromLocalStorage(): string {
    if (localStorage.getItem('jwt') !== undefined) {
      return localStorage.getItem('jwt');
    }

    return undefined;
  }

  dismissToast(toastId: number): void {
    this.toastsFacade.dispatch(dismissToast({ toastId }));
  }
}
