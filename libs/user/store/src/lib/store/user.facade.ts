import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as UserSelectors from './user.selectors';

@Injectable({ providedIn: 'root' })
export class UserFacade {
  loaded$ = this.store.pipe(select(UserSelectors.getUserLoaded));
  permissions$ = this.store.pipe(select(UserSelectors.getPermissions));

  constructor(private store: Store) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
