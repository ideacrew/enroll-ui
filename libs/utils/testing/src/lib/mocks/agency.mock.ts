import * as faker from 'faker/locale/en_US';

import {
  AgencyProfile,
  PrimaryAgent,
  AgencyType,
  AgencyStaff,
  EmailKind,
} from '@hbx/api-interfaces';

const DEFAULT_STAFF = 5;

export function mockAgencyProfile(agencyProfileId: string): AgencyProfile {
  const agency: AgencyProfile = {
    organization_id: faker.random.uuid(),
    agency_profile_id: agencyProfileId,
    dba: faker.company.companyName(),
    legal_name: faker.company.companyName(),
    agency_profile_type:
      faker.random.number(10) > 2 ? AgencyType.Broker : AgencyType.General,
  };

  return agency;
}

export function mockPrimaryAgent(agencyProfileId: string): PrimaryAgent {
  const genderNumber = faker.random.number(1);

  const primaryAgent: PrimaryAgent = {
    agency_role_id: faker.random.uuid(),
    connected_profile_id: agencyProfileId,
    first_name: faker.name.firstName(genderNumber),
    last_name: faker.name.lastName(),
    agent_npn: faker.random
      .number({ min: 111111111, max: 999999999 })
      .toString(),
  };

  return primaryAgent;
}

export function mockManyAgencyStaff(
  agencyProfileId: string,
  totalStaff: number = DEFAULT_STAFF
): AgencyStaff[] {
  return Array.from({ length: totalStaff }, () =>
    mockOneAgencyStaff(agencyProfileId)
  );
}

export function mockOneAgencyStaff(agencyProfileId: string): AgencyStaff {
  const genderNumber = faker.random.number(1);

  const agencyStaff: AgencyStaff = {
    _id: faker.random.uuid(),
    first_name: faker.name.firstName(genderNumber),
    last_name: faker.name.lastName(),
    hbx_id: faker.random.uuid(),
    agency_roles: [
      {
        agency_profile_id: agencyProfileId,
        aasm_state: 'active',
      },
    ],
    agent_emails: [
      {
        address: faker.internet.email(),
        kind: EmailKind.Home,
        id: faker.random.uuid(),
      },
    ],
    dob: faker.date.past(40).toISOString(),
  };

  return agencyStaff;
}
