import { AgencyProfile, AgencyStaff, PrimaryAgent } from '@hbx/api-interfaces';

const DEFAULT_AGENCIES = 5;

export interface FullAgencies {
  agencies: AgencyProfile[];
  agencyStaff: AgencyStaff[];
  primaryAgents: PrimaryAgent[];
}

export function mockAgencies(
  totalAgencies: number = DEFAULT_AGENCIES
): FullAgencies {
  const agenciesWithStaff = Array.from({ length: DEFAULT_AGENCIES });

  const fullAgencies: FullAgencies = {
    agencies: [],
    agencyStaff: [],
    primaryAgents: [],
  };

  return fullAgencies;
}
