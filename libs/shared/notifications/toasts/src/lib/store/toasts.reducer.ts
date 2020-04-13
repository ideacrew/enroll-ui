import { createReducer, on, Action } from '@ngrx/store';
import {
  EntityState,
  EntityAdapter,
  createEntityAdapter,
  Update,
} from '@ngrx/entity';

import * as ToastsActions from './toasts.actions';
import { ToastsEntity, ToastType } from './toasts.models';

export const TOASTS_FEATURE_KEY = 'toasts';

export interface State extends EntityState<ToastsEntity> {}

export interface ToastsPartialState {
  readonly [TOASTS_FEATURE_KEY]: State;
}

export const toastsAdapter: EntityAdapter<ToastsEntity> = createEntityAdapter<
  ToastsEntity
>();

export const initialState: State = toastsAdapter.getInitialState();

const toastsReducer = createReducer(
  initialState,
  on(ToastsActions.addToast, (state, { request }) => {
    const toastMessage: ToastsEntity = {
      id: Date.now(),
      heading: request.heading,
      message: request.message,
      type: request.type || ToastType.Info,
      dismissed: false,
    };

    return toastsAdapter.addOne(toastMessage, state);
  }),
  on(ToastsActions.dismissToast, (state, { toastId }) => {
    const changedToast: Update<ToastsEntity> = {
      id: toastId,
      changes: {
        dismissed: true,
      },
    };

    return toastsAdapter.updateOne(changedToast, state);
  })
);

export function reducer(state: State | undefined, action: Action) {
  return toastsReducer(state, action);
}
