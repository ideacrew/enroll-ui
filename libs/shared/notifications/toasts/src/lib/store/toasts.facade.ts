import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromToasts from './toasts.reducer';
import * as ToastsSelectors from './toasts.selectors';

@Injectable()
export class ToastsFacade {
  loaded$ = this.store.pipe(select(ToastsSelectors.getToastsLoaded));
  allToasts$ = this.store.pipe(select(ToastsSelectors.getAllToasts));
  selectedToasts$ = this.store.pipe(select(ToastsSelectors.getSelected));

  constructor(private store: Store<fromToasts.ToastsPartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
