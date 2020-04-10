import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  TOASTS_FEATURE_KEY,
  State,
  ToastsPartialState,
  toastsAdapter,
} from './toasts.reducer';

// Lookup the 'Toasts' feature state managed by NgRx
export const getToastsState = createFeatureSelector<ToastsPartialState, State>(
  TOASTS_FEATURE_KEY
);

const { selectAll, selectEntities } = toastsAdapter.getSelectors();

export const getToastsLoaded = createSelector(
  getToastsState,
  (state: State) => state.loaded
);

export const getToastsError = createSelector(
  getToastsState,
  (state: State) => state.error
);

export const getAllToasts = createSelector(getToastsState, (state: State) =>
  selectAll(state)
);

export const getToastsEntities = createSelector(
  getToastsState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getToastsState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getToastsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
