import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';

import {
  AgencyStaff,
  AgencyProfile,
  PrimaryAgent,
  AgencyStaffWithDetail,
} from '@hbx/api-interfaces';
import { AgencyVM, AgencyStaffVM } from '@hbx/admin/shared/view-models';

import {
  AGENCYSTAFF_FEATURE_KEY,
  State,
  AgencyStaffPartialState,
  agencyStaffAdapter,
} from './agency-staff.reducer';
import { getAllAgencies } from '../agencies/agencies.selectors';
import { AgenciesPartialState } from '../agencies/agencies.reducer';
import { PrimaryAgentsPartialState } from '../primary-agents/primary-agents.reducer';
import { getPrimaryAgentsEntities } from '../primary-agents/primary-agents.selectors';
import {
  createAllAgencyVMs,
  createAllAgencyStaffVMs,
  createSingleAgencyStaffDetailVM,
} from '../../utils';

// Lookup the 'AgencyStaff' feature state managed by NgRx
export const getAgencyStaffState = createFeatureSelector<
  AgencyStaffPartialState & AgenciesPartialState & PrimaryAgentsPartialState,
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

export const selectedAgentDetail = createSelector(
  getAgencyStaffState,
  (state: State) => state.agencyStaffDetail
);

export const getAllAgencyStaff = createSelector(
  getAgencyStaffState,
  selectAll
);

export const getAgencyStaffEntities = createSelector(
  getAgencyStaffState,
  selectEntities
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

export const getAgencyVMs = createSelector(
  getAllAgencies,
  getPrimaryAgentsEntities,
  (
    agencyProfiles: AgencyProfile[],
    primaryAgents: Dictionary<PrimaryAgent>
  ): AgencyVM[] => {
    if (Object.getOwnPropertyNames(primaryAgents).length > 0) {
      return createAllAgencyVMs(agencyProfiles, primaryAgents);
    } else {
      return [];
    }
  }
);

const getAgencyVMEntities = createSelector(
  getAgencyVMs,
  (agencyVMs): Dictionary<AgencyVM> => {
    return agencyVMs.reduce((dictionary, agency) => {
      return {
        ...dictionary,
        [agency.agencyProfileId]: agency,
      };
    }, {});
  }
);

export const getAgencyStaffVMs = createSelector(
  getAllAgencyStaff,
  getAgencyVMEntities,
  (
    agencyStaff: AgencyStaff[],
    agencyVMs: Dictionary<AgencyVM>
  ): AgencyStaffVM[] => {
    if (Object.getOwnPropertyNames(agencyVMs).length > 0) {
      return createAllAgencyStaffVMs(agencyStaff, agencyVMs);
    } else {
      return [];
    }
  }
);

const getAgencyStaffVMDictionary = createSelector(
  getAgencyStaffVMs,
  (agencyStaff: AgencyStaffVM[]): Dictionary<AgencyStaffVM> =>
    agencyStaff.reduce((dictionary, staff) => {
      return {
        ...dictionary,
        [staff.personId]: staff,
      };
    }, {})
);

export const selectedAgencyStaffVM = createSelector(
  selectedAgentDetail,
  getAgencyVMEntities,
  (agent: AgencyStaffWithDetail, agencies: Dictionary<AgencyVM>) => {
    if (agent !== undefined) {
      return createSingleAgencyStaffDetailVM(agent, agencies);
    } else {
      return null;
    }
  }
);
