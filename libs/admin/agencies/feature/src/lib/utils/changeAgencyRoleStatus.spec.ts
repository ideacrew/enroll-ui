import { Update } from '@ngrx/entity';

import {
  AgencyStaff,
  RoleChangeRequest,
  AgencyRoleState,
  AgencyStaffWithDetail,
  WorkflowStateTransition,
} from '@hbx/api-interfaces';
import {
  mockAgencyWithStaff,
  mockOneFullAgencyStaff,
} from '@hbx/utils/testing';

import {
  changeAgencyRoleStatus,
  changeAgencyRoleStatusDetail,
} from './changeAgencyRoleStatus';
import { ChangeHistory } from '@hbx/admin/shared/view-models';

describe('Change Agency Role status', () => {
  it('should change the status of a specific role', () => {
    const agency = mockAgencyWithStaff('1234');

    const [_primaryAgent, agencyStaffOne] = agency.agencyStaff;

    // Just use first (and only) role
    const [role] = agencyStaffOne.agency_roles;

    const request: RoleChangeRequest = {
      agencyRoleId: role.role_id,
      agencyStaffId: agencyStaffOne._id,
      from: role.aasm_state,
      to: AgencyRoleState.Terminated,
    };

    const agencyStaffDictionary = {
      [agencyStaffOne._id]: agencyStaffOne,
    };

    const updatedStaff: Update<AgencyStaff> = {
      id: agencyStaffOne._id,
      changes: {
        agency_roles: [
          {
            ...role,
            aasm_state: request.to,
          },
        ],
      },
    };

    expect(changeAgencyRoleStatus(agencyStaffDictionary, request)).toEqual(
      updatedStaff
    );
  });
});

describe('Change Agency Role Status from Detail Page', () => {
  it('should update an agency staff detail with new role', () => {
    const agency = mockAgencyWithStaff('1234');

    const [_primaryAgent, agencyStaffOne] = agency.agencyStaff;

    const agentWithDetail = mockOneFullAgencyStaff(agencyStaffOne);

    // Just use first (and only) role
    const [role] = agentWithDetail.agency_roles;

    const request: RoleChangeRequest = {
      agencyRoleId: role.role_id,
      agencyStaffId: agencyStaffOne._id,
      from: role.aasm_state,
      to: AgencyRoleState.Terminated,
    };

    const today = new Date();

    const thisYear = today.getFullYear();
    const thisMonth = today.getMonth();
    const thisDay = today.getDate();

    const newEvent: WorkflowStateTransition<AgencyRoleState> = {
      _id: 'temporary-id',
      transition_at: new Date(thisYear, thisMonth, thisDay).toISOString(),
      from_state: role.aasm_state,
      to_state: AgencyRoleState.Terminated,
    };

    const updatedStaff: AgencyStaffWithDetail = {
      ...agentWithDetail,
      agency_roles: [
        {
          ...role,
          history: [...role.history, newEvent],
          aasm_state: request.to,
        },
      ],
    };

    expect(changeAgencyRoleStatusDetail(agentWithDetail, request)).toEqual(
      updatedStaff
    );
  });
});
