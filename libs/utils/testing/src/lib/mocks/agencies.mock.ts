import * as faker from 'faker/locale/en_US';

import { AgencyProfile, AgencyStaff, PrimaryAgent } from '@hbx/api-interfaces';

import {
  mockAgencyWithStaff,
  ApprovedAgencyWithStaff,
} from './agencyWithStaff.mock';

const DEFAULT_AGENCIES = 5;

export interface FullAgencies {
  agencies: AgencyProfile[];
  agencyStaff: AgencyStaff[];
  primaryAgents: PrimaryAgent[];
}

export function mockAgencies(
  totalAgencies: number = DEFAULT_AGENCIES
): FullAgencies {
  const agenciesWithStaff: ApprovedAgencyWithStaff[] = Array.from(
    { length: totalAgencies },
    () => mockAgencyWithStaff(faker.random.uuid())
  ) as ApprovedAgencyWithStaff[];

  const agencies = agenciesWithStaff.map(
    agencyWithStaff => agencyWithStaff.agency
  );
  const primaryAgents = agenciesWithStaff.map(
    agencyWithStaff => agencyWithStaff.primaryAgent
  );

  // tslint:disable:no-unsafe-any
  const agencyStaff: AgencyStaff[] = agenciesWithStaff
    .map(
      (agencyWithStaff: ApprovedAgencyWithStaff) => agencyWithStaff.agencyStaff
    )
    .flat() as AgencyStaff[];

  const fullAgencies: FullAgencies = {
    agencies,
    agencyStaff,
    primaryAgents,
  };

  return fullAgencies;
}
