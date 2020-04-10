import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  TOASTS_FEATURE_KEY,
  State,
  ToastsPartialState,
  toastsAdapter,
} from './toasts.reducer';
import { ToastsEntity } from './toasts.models';

// Lookup the 'Toasts' feature state managed by NgRx
export const getToastsState = createFeatureSelector<ToastsPartialState, State>(
  TOASTS_FEATURE_KEY
);

const { selectAll, selectEntities } = toastsAdapter.getSelectors();

export const getAllToasts = createSelector(getToastsState, (state: State) =>
  selectAll(state)
);

export const getToastsEntities = createSelector(
  getToastsState,
  (state: State) => selectEntities(state)
);

export const getVisibleToasts = createSelector(
  getAllToasts,
  (toasts: ToastsEntity[]) => toasts.filter(toast => toast.dismissed === false)
);
