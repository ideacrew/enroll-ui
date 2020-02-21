import * as faker from 'faker/locale/en_US';

import { AgencyProfile, AgencyStaff, PrimaryAgent } from '@hbx/api-interfaces';

import { mockAgencyWithStaff } from './agencyWithStaff.mock';

const DEFAULT_AGENCIES = 5;

export interface FullAgencies {
  agencies: AgencyProfile[];
  agencyStaff: AgencyStaff[];
  primaryAgents: PrimaryAgent[];
}

export function mockAgencies(
  totalAgencies: number = DEFAULT_AGENCIES
): FullAgencies {
  const agenciesWithStaff = Array.from({ length: totalAgencies }, () =>
    mockAgencyWithStaff(faker.random.uuid())
  );

  const agencies = agenciesWithStaff.map(
    agencyWithStaff => agencyWithStaff.agency
  );
  const primaryAgents = agenciesWithStaff.map(
    agencyWithStaff => agencyWithStaff.primaryAgent
  );
  const agencyStaff = agenciesWithStaff
    .map(agencyWithStaff => agencyWithStaff.agencyStaff)
    .flat();

  const fullAgencies: FullAgencies = {
    agencies,
    agencyStaff,
    primaryAgents,
  };

  return fullAgencies;
}
