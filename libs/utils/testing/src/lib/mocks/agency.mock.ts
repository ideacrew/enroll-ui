import * as faker from 'faker/locale/en_US';

import {
  Agency,
  PrimaryAgent,
  AgencyType,
  AgencyStaff,
  AgentRole,
} from '@hbx/api-interfaces';

const DEFAULT_STAFF = 5;

export function mockAgency(
  agencyProfileId: string,
  primaryAgentRoleId: string
): Agency {
  const agency: Agency = {
    agencyProfileId,
    dba: faker.company.companyName(),
    legalName: faker.company.companyName(),
    agencyType:
      faker.random.number(1) > 0.1 ? AgencyType.Broker : AgencyType.General,
    primaryAgent: mockPrimaryAgent(primaryAgentRoleId),
  };

  return agency;
}

export function mockPrimaryAgent(primaryAgentRoleId: string): PrimaryAgent {
  const genderNumber = faker.random.number(1);

  const primaryAgent: PrimaryAgent = {
    agentRoleId: primaryAgentRoleId,
    firstName: faker.name.firstName(genderNumber),
    lastName: faker.name.lastName(),
    npn: faker.random.number({ min: 111111111, max: 999999999 }).toString(),
  };

  return primaryAgent;
}

export function mockManyAgencyStaff(
  totalStaff: number = DEFAULT_STAFF,
  agency: Agency
): AgencyStaff[] {
  return Array.from({ length: totalStaff }, () => mockOneAgencyStaff());
}

export function mockOneAgencyStaff(agency: Agency): AgencyStaff {
  const genderNumber = faker.random.number(1);

  const agencyStaff: AgencyStaff = {
    personId: faker.random.uuid(),
    firstName: faker.name.firstName(genderNumber),
    lastName: faker.name.lastName(),
    hbxId: faker.random.uuid(),
    agentRoles: [],
  };

  return agencyStaff;
}

export function mockAgencyStaffRole(agencyProfileId: string): AgentRole {}
