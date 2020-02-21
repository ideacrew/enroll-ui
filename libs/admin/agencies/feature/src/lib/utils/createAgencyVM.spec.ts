import * as faker from 'faker';
import { Dictionary } from '@ngrx/entity';

import { AgencyProfile, AgencyStaff, PrimaryAgent } from '@hbx/api-interfaces';
import { mockAgencyWithStaff } from '@hbx/utils/testing';
import { AgencyVM } from '@hbx/admin/shared/view-models';

import { createAgencyVM } from './createAgencyVM';

describe('Agency VM Creation', () => {
  let agency: AgencyProfile;
  let agencyStaff: AgencyStaff[];
  let primaryAgent: PrimaryAgent;
  let primaryAgents: Dictionary<PrimaryAgent>;

  beforeEach(() => {
    const mockAgency = mockAgencyWithStaff(faker.random.uuid());

    agency = mockAgency.agency;
    agencyStaff = mockAgency.agencyStaff;
    primaryAgent = mockAgency.primaryAgent;
    primaryAgents = {
      [primaryAgent.connected_profile_id]: primaryAgent,
    };
  });

  it('should create an agency view model', () => {
    const {
      agency_profile_id,
      agency_profile_type,
      legal_name,
      organization_id,
    } = agency;

    const agencyVM: AgencyVM = {
      agencyName: legal_name,
      agencyProfileId: agency_profile_id,
      orgId: organization_id,
      profileType: agency_profile_type,
      primaryAgent: {
        firstName: primaryAgent.first_name,
        lastName: primaryAgent.last_name,
        npn: primaryAgent.agent_npn,
        roleId: primaryAgent.agency_role_id,
        hbxId: primaryAgent.hbx_id,
      },
    };

    expect(createAgencyVM(agency, primaryAgents)).toEqual(agencyVM);
  });
});
