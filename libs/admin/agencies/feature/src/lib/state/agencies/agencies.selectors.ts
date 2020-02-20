import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  AGENCIES_FEATURE_KEY,
  State,
  AgenciesPartialState,
  agenciesAdapter,
} from './agencies.reducer';
import { AgencyStaffPartialState } from '../agency-staff/agency-staff.reducer';
import { PrimaryAgentsPartialState } from '../primary-agents/primary-agents.reducer';

// Lookup the 'Agencies' feature state managed by NgRx
export const getAgenciesState = createFeatureSelector<
  AgenciesPartialState & AgencyStaffPartialState & PrimaryAgentsPartialState,
  State
>(AGENCIES_FEATURE_KEY);

const { selectAll, selectEntities } = agenciesAdapter.getSelectors();

export const getAgenciesLoaded = createSelector(
  getAgenciesState,
  (state: State) => state.loaded
);

export const getAgenciesError = createSelector(
  getAgenciesState,
  (state: State) => state.error
);

export const getAllAgencies = createSelector(getAgenciesState, (state: State) =>
  selectAll(state)
);

export const getAgenciesEntities = createSelector(
  getAgenciesState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getAgenciesState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getAgenciesEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
