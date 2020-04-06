import { createFeatureSelector, createSelector } from '@ngrx/store';
import { USER_FEATURE_KEY, State, UserPartialState } from './user.reducer';

// Lookup the 'User' feature state managed by NgRx
export const getUserState = createFeatureSelector<UserPartialState, State>(
  USER_FEATURE_KEY
);

export const getPermissions = createSelector(
  getUserState,
  (state: State) => state.permissions
);

export const getUserLoaded = createSelector(
  getUserState,
  (state: State) => state.loaded
);

export const getUserError = createSelector(
  getUserState,
  (state: State) => state.error
);
