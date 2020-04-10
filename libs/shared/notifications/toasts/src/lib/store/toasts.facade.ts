import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromToasts from './toasts.reducer';
import * as ToastsSelectors from './toasts.selectors';
import { ToastsEntity } from './toasts.models';

@Injectable()
export class ToastsFacade {
  visibleToasts$: Observable<ToastsEntity[]> = this.store.pipe(
    select(ToastsSelectors.getVisibleToasts)
  );

  constructor(private store: Store<fromToasts.ToastsPartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
