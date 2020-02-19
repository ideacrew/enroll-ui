import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  AGENCYSTAFF_FEATURE_KEY,
  State,
  AgencyStaffPartialState,
  agencyStaffAdapter,
} from './agency-staff.reducer';

// Lookup the 'AgencyStaff' feature state managed by NgRx
export const getAgencyStaffState = createFeatureSelector<
  AgencyStaffPartialState,
  State
>(AGENCYSTAFF_FEATURE_KEY);

const { selectAll, selectEntities } = agencyStaffAdapter.getSelectors();

export const getAgencyStaffLoaded = createSelector(
  getAgencyStaffState,
  (state: State) => state.loaded
);

export const getAgencyStaffError = createSelector(
  getAgencyStaffState,
  (state: State) => state.error
);

export const getAllAgencyStaff = createSelector(
  getAgencyStaffState,
  (state: State) => selectAll(state)
);

export const getAgencyStaffEntities = createSelector(
  getAgencyStaffState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getAgencyStaffState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getAgencyStaffEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
