import * as faker from 'faker';

import {
  AgencyStaff,
  AgencyRoleState,
  PrimaryAgent,
  EmailKind,
  WorkflowStateTransition,
  AgencyStaffWithDetail,
  AgencyRole,
} from '@hbx/api-interfaces';

export function mockOnePartialAgencyStaff(
  agencyProfileId: string
): AgencyStaff {
  const genderNumber = faker.random.number(1);

  const agencyStaff: AgencyStaff = {
    _id: faker.random.uuid(),
    first_name: faker.name.firstName(genderNumber),
    last_name: faker.name.lastName(),
    hbx_id: faker.random.uuid(),
    agency_roles: [
      {
        role_id: faker.random.uuid(),
        agency_profile_id: agencyProfileId,
        aasm_state: AgencyRoleState.Active,
      },
    ],
  };

  return agencyStaff;
}

export function mockOneFullAgencyStaff(
  partialAgencyStaff: AgencyStaff
): AgencyStaffWithDetail {
  const recent = faker.date.recent(10).toISOString();

  const transitions: WorkflowStateTransition<AgencyRoleState>[] = [
    {
      _id: faker.random.uuid(),
      from_state: AgencyRoleState.Pending,
      to_state: AgencyRoleState.Active,
      transition_at: recent,
    },
  ];

  const [role] = partialAgencyStaff.agency_roles;

  const agencyRole: AgencyRole = {
    ...role,
    history: transitions,
  };

  const agencyStaff: AgencyStaffWithDetail = {
    ...partialAgencyStaff,
    agent_emails: [
      {
        address: faker.internet.email(),
        kind: EmailKind.Work,
        id: faker.random.uuid(),
      },
      {
        address: faker.internet.email(),
        kind: EmailKind.Work,
        id: faker.random.uuid(),
      },
      {
        address: faker.internet.email(),
        kind: EmailKind.Work,
        id: faker.random.uuid(),
      },
    ],
    dob: faker.date.past(20, 'Jan 1, 1980').toISOString(),
    ssn: faker.random.number({ min: 111111111, max: 999999999 }).toString(),
    agency_roles: [agencyRole],
    has_active_enrollment: faker.random.boolean(),
  };

  return agencyStaff;
}

export function mockPrimaryAgent(agencyProfileId: string): PrimaryAgent {
  const genderNumber = faker.random.number(1);

  const primaryAgent: PrimaryAgent = {
    agent_role_id: faker.random.uuid(),
    connected_profile_id: agencyProfileId,
    first_name: faker.name.firstName(genderNumber),
    last_name: faker.name.lastName(),
    agent_npn: faker.random
      .number({ min: 111111111, max: 999999999 })
      .toString(),
    hbx_id: faker.random.uuid(),
  };

  return primaryAgent;
}
