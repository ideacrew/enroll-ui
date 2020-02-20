import { AgencyProfile, PrimaryAgent, AgencyStaff } from '@hbx/api-interfaces';

import {
  mockAgencyProfile,
  mockPrimaryAgent,
  mockManyAgencyStaff,
} from './agency.mock';

export interface ApprovedAgencyWithStaff {
  agency: AgencyProfile;
  primaryAgent: PrimaryAgent;
  agencyStaff: AgencyStaff[];
}

export function mockAgencyWithStaff(
  agencyProfileId: string
): ApprovedAgencyWithStaff {
  const primaryAgent = mockPrimaryAgent(agencyProfileId);
  const agency = mockAgencyProfile(agencyProfileId);
  const agencyStaff = mockManyAgencyStaff(agencyProfileId);

  return {
    primaryAgent,
    agency,
    agencyStaff,
  };
}
