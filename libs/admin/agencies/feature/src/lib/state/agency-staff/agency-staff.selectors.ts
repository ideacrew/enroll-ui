import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  AGENCYSTAFF_FEATURE_KEY,
  State,
  AgencyStaffPartialState,
  agencyStaffAdapter,
} from './agency-staff.reducer';
import { getAllAgencies } from '../agencies/agencies.selectors';
import { AgenciesPartialState } from '../agencies/agencies.reducer';
import { AgencyStaff, AgencyProfile, PrimaryAgent } from '@hbx/api-interfaces';
import { Dictionary } from '@ngrx/entity';
import {
  AgencyVM,
  AgencyRoleVM,
  AgencyStaffVM,
  EmailVM,
  PrimaryAgentVM,
} from '@hbx/admin/shared/view-models';
import { PrimaryAgentsPartialState } from '../primary-agents/primary-agents.reducer';
import { getPrimaryAgentsEntities } from '../primary-agents/primary-agents.selectors';

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

export const getAgencyVMs = createSelector(
  getAllAgencies,
  getPrimaryAgentsEntities,
  (
    agencyProfiles: AgencyProfile[],
    primaryAgents: Dictionary<PrimaryAgent>
  ): AgencyVM[] => {
    if (Object.getOwnPropertyNames(primaryAgents).length > 0) {
      return agencyProfiles.map(profile => {
        const { agency_profile_id } = profile;

        const primaryAgent = primaryAgents[agency_profile_id];

        const primaryAgentVM: PrimaryAgentVM = {
          firstName: primaryAgent.first_name,
          lastName: primaryAgent.last_name,
          npn: primaryAgent.agent_npn,
          roleId: primaryAgent.connected_profile_id,
        };

        const agencyVM: AgencyVM = {
          agencyName: profile.legal_name,
          orgId: profile.organization_id,
          profileType: profile.agency_profile_type,
          primaryAgent: primaryAgentVM,
          agencyProfileId: primaryAgent.connected_profile_id,
        };

        return agencyVM;
      });
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
      return agencyStaff.map(staff => {
        const {
          _id,
          first_name,
          last_name,
          dob,
          agency_roles,
          agent_emails,
          hbx_id,
        } = staff;

        const agencyRoles: AgencyRoleVM[] = agency_roles.map(role => {
          const {
            orgId,
            profileType,
            primaryAgent,
            agencyProfileId,
            agencyName,
          } = agencyVMs[role.agency_profile_id];

          const agencyRole: AgencyRoleVM = {
            agencyName,
            currentState: role.aasm_state,
            orgId,
            primaryAgent,
            agencyProfileId,
            profileType,
          };

          return agencyRole;
        });

        const emails: EmailVM[] = agent_emails.map(email => {
          return { id: email.id, address: email.address, kind: email.kind };
        });

        const agencyStaffVM: AgencyStaffVM = {
          agencyRoles,
          emails,
          firstName: first_name,
          lastName: last_name,
          dob: new Date(dob),
          hbxId: hbx_id,
          personId: _id,
        };

        return agencyStaffVM;
      });
    } else {
      return [];
    }
  }
);
