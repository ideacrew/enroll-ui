import { Agency, AgencyStaff } from '@hbx/api-interfaces';

export interface FullAgencies {
  agencies: Agency[];
  agencyStaff: AgencyStaff[];
}

export function mockAgencies(totalAgencies: number = 5): FullAgencies {
  const numberOfBrokerAgencies = totalAgencies - 1;

  const approvedBrokerAgencies: ApprovedBrokerAgencyWithStaff[] = Array.from(
    { length: numberOfBrokerAgencies },
    approvedAgencyWithStaff
  );

  const approvedBrokerAgencyStaff: Array<
    BrokerAgencyStaff | PrimaryBrokerStaff
  > = approvedBrokerAgencies.reduce((staff, agency) => {
    return [...staff, ...agency.brokerStaff, agency.primaryBroker];
  }, []);

  return {
    agencies,
    agencyStaff,
  };
}
