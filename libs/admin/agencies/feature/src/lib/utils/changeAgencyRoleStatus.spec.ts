import { Update } from '@ngrx/entity';

import { mockAgencyWithStaff } from '@hbx/utils/testing';
import { TerminationRequest } from '@hbx/admin/shared/ui-components';
import { AgencyStaff } from '@hbx/api-interfaces';

import { changeAgencyRoleStatus } from './changeAgencyRoleStatus';

describe('Change Agency Role status', () => {
  it('should change the status of a specific role', () => {
    const agency = mockAgencyWithStaff('1234');

    const [_primaryAgent, agencyStaffOne] = agency.agencyStaff;

    const request: TerminationRequest = {
      agencyProfileId: '1234',
      agencyStaffId: agencyStaffOne._id,
    };

    const agencyStaffDictionary = {
      [agencyStaffOne._id]: agencyStaffOne,
    };

    const updatedStaff: Update<AgencyStaff> = {
      id: agencyStaffOne._id,
      changes: {
        agency_roles: [
          {
            aasm_state: 'terminated',
            agency_profile_id: '1234',
          },
        ],
      },
    };

    expect(changeAgencyRoleStatus(agencyStaffDictionary, request)).toEqual(
      updatedStaff
    );
  });
});
