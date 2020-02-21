import * as faker from 'faker';
import { Dictionary } from '@ngrx/entity';

import { AgencyProfile, AgencyStaff, PrimaryAgent } from '@hbx/api-interfaces';
import { mockAgencyWithStaff } from '@hbx/utils/testing';
import { AgencyVM, AgencyStaffVM } from '@hbx/admin/shared/view-models';

import { createAgencyVM, createAgencyVMDictionary } from './createAgencyVM';
import {
  createSingleAgencyStaffVM,
  createAllAgencyStaffVMs,
} from './createAgencyStaffVM';

describe('Agency VM Creation', () => {
  let mockAgencyProfile: AgencyProfile;
  let mockAgencyStaff: AgencyStaff[];
  let mockPrimaryAgent: PrimaryAgent;
  let primaryAgents: Dictionary<PrimaryAgent>;
  let agencyVM: AgencyVM;
  let agencyDictionary: Dictionary<AgencyVM>;

  beforeEach(() => {
    const agencyWithStaff = mockAgencyWithStaff(faker.random.uuid());

    mockAgencyProfile = agencyWithStaff.agency;
    mockAgencyStaff = agencyWithStaff.agencyStaff;
    mockPrimaryAgent = agencyWithStaff.primaryAgent;
    primaryAgents = {
      [mockPrimaryAgent.connected_profile_id]: mockPrimaryAgent,
    };

    agencyVM = createAgencyVM(mockAgencyProfile, primaryAgents);
    agencyDictionary = createAgencyVMDictionary([agencyVM]);
  });

  // This test just uses the first agencyStaff and first agencyRole
  // because for simple agencies there's just one role per staff
  it('should create an agency staff view model', () => {
    const mockAgentTwo = mockAgencyStaff[1];

    const {
      _id,
      first_name,
      last_name,
      dob,
      agency_roles,
      agent_emails,
      hbx_id,
    } = mockAgentTwo;

    const [agencyRole] = agency_roles;

    const expectedAgencyStaffVM: AgencyStaffVM = {
      personId: _id,
      dob: new Date(dob),
      emails: [
        {
          id: agent_emails[0].id,
          address: agent_emails[0].address,
          kind: agent_emails[0].kind,
        },
      ],
      firstName: first_name,
      lastName: last_name,
      hbxId: hbx_id,
      agencyRoles: [
        {
          agencyName: mockAgencyProfile.legal_name,
          agencyProfileId: mockAgencyProfile.agency_profile_id,
          currentState: agencyRole.aasm_state,
          orgId: mockAgencyProfile.organization_id,
          primaryAgent: {
            firstName: mockPrimaryAgent.first_name,
            hbxId: mockPrimaryAgent.hbx_id,
            lastName: mockPrimaryAgent.last_name,
            npn: mockPrimaryAgent.agent_npn,
            roleId: mockPrimaryAgent.agency_role_id,
          },
          profileType: mockAgencyProfile.agency_profile_type,
        },
      ],
    };

    const testAgencyStaffVM = createSingleAgencyStaffVM(
      mockAgentTwo,
      agencyDictionary
    );

    expect(testAgencyStaffVM).toEqual(expectedAgencyStaffVM);
  });

  it('should create an agency staff view model with no roles because the staff is a primary agent', () => {
    // This is the primary agent's agency staff profile
    const mockAgentOne = mockAgencyStaff[0];

    const {
      _id,
      first_name,
      last_name,
      dob,
      agent_emails,
      hbx_id,
    } = mockAgentOne;

    const expectedAgencyStaffVM: AgencyStaffVM = {
      personId: _id,
      dob: new Date(dob),
      emails: [
        {
          id: agent_emails[0].id,
          address: agent_emails[0].address,
          kind: agent_emails[0].kind,
        },
      ],
      firstName: first_name,
      lastName: last_name,
      hbxId: hbx_id,
      agencyRoles: [],
    };

    const testAgencyStaffVM = createSingleAgencyStaffVM(
      mockAgentOne,
      agencyDictionary
    );

    expect(testAgencyStaffVM).toEqual(expectedAgencyStaffVM);
  });

  it('should create a final list of 5 agent staff VMs', () => {
    expect(
      createAllAgencyStaffVMs(mockAgencyStaff, agencyDictionary)
    ).toHaveLength(5);
  });
});
