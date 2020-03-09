import * as faker from 'faker';

import {
  AgencyProfile,
  PrimaryAgent,
  AgencyProfileType,
  AgencyStaff,
  AgencyRoleState,
} from '@hbx/api-interfaces';
import { mockOnePartialAgencyStaff } from './agencyStaff.mock';

const DEFAULT_STAFF = 5;

export function mockAgencyProfile(agencyProfileId: string): AgencyProfile {
  const agency: AgencyProfile = {
    organization_id: faker.random.uuid(),
    agency_profile_id: agencyProfileId,
    dba: faker.company.companyName(),
    legal_name: faker.company.companyName(),
    agency_profile_type:
      faker.random.number(10) > 2
        ? AgencyProfileType.Broker
        : AgencyProfileType.General,
  };

  return agency;
}

export function mockManyAgencyStaff(
  agencyProfileId: string,
  totalStaff: number = DEFAULT_STAFF
): AgencyStaff[] {
  return Array.from({ length: totalStaff }, () =>
    mockOnePartialAgencyStaff(agencyProfileId)
  );
}

export function mockPrimaryAgentStaffRole(
  primaryAgent: PrimaryAgent
): AgencyStaff {
  const { first_name, connected_profile_id, last_name, hbx_id } = primaryAgent;

  const agencyStaff: AgencyStaff = {
    _id: faker.random.uuid(),
    first_name,
    last_name,
    hbx_id,
    agency_roles: [
      {
        role_id: faker.random.uuid(),
        agency_profile_id: connected_profile_id,
        aasm_state: AgencyRoleState.Active,
      },
    ],
  };

  return agencyStaff;
}
