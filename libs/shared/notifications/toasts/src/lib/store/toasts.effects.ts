import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromToasts from './toasts.reducer';
import * as ToastsActions from './toasts.actions';

@Injectable()
export class ToastsEffects {
  loadToasts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ToastsActions.loadToasts),
      fetch({
        run: action => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return ToastsActions.loadToastsSuccess({ toasts: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return ToastsActions.loadToastsFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
