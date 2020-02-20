import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  PRIMARYAGENTS_FEATURE_KEY,
  State,
  PrimaryAgentsPartialState,
  primaryAgentsAdapter,
} from './primary-agents.reducer';
import { AgenciesPartialState } from '../agencies/agencies.reducer';
import { AgencyStaffPartialState } from '../agency-staff/agency-staff.reducer';

// Lookup the 'PrimaryAgents' feature state managed by NgRx
export const getPrimaryAgentsState = createFeatureSelector<
  AgenciesPartialState & AgencyStaffPartialState & PrimaryAgentsPartialState,
  State
>(PRIMARYAGENTS_FEATURE_KEY);

const { selectAll, selectEntities } = primaryAgentsAdapter.getSelectors();

export const getPrimaryAgentsLoaded = createSelector(
  getPrimaryAgentsState,
  (state: State) => state.loaded
);

export const getPrimaryAgentsError = createSelector(
  getPrimaryAgentsState,
  (state: State) => state.error
);

export const getAllPrimaryAgents = createSelector(
  getPrimaryAgentsState,
  (state: State) => selectAll(state)
);

export const getPrimaryAgentsEntities = createSelector(
  getPrimaryAgentsState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getPrimaryAgentsState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getPrimaryAgentsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
