import { Update } from '@ngrx/entity';

import {
  AgencyStaff,
  RoleChangeRequest,
  AgencyRoleState,
} from '@hbx/api-interfaces';
import { mockAgencyWithStaff } from '@hbx/utils/testing';

import { changeAgencyRoleStatus } from './changeAgencyRoleStatus';

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
