import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as ToastsSelectors from './toasts.selectors';
import { ToastsEntity } from './toasts.models';

@Injectable()
export class ToastsFacade {
  visibleToasts$: Observable<ToastsEntity[]> = this.store.pipe(
    select(ToastsSelectors.getVisibleToasts)
  );

  constructor(private store: Store) {}

  dispatch(action: Action): void {
    this.store.dispatch(action);
  }

  trackById(index: number, toast: ToastsEntity): number {
    return toast.id;
  }
}
