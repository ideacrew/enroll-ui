import { mockAgencies } from '@hbx/utils/testing';

import { searchAgencyStaff } from './searchAgencyStaff';

describe('Search agency staff VMs', () => {
  const { agencies, agencyStaff, primaryAgents } = mockAgencies();

  it('should return a full set of results when the search string is empty', () => {
    const numberOfStaff = agencyStaff.length;

    expect(searchAgencyStaff('', agencyStaffVM)).toHaveLength(numberOfStaff);
  });

  it('should return zero results when no matches are found', () => {
    const query = '23adfsgdsl343lkjf;lkdf;laskd3483783';

    expect(searchAgencyStaff(query, agencyStaffVM)).toHaveLength(0);
  });

  // When performing queries, pass in a trimmed, lowercase string
  it('should return one result when the full name of an agent is used to search', () => {
    const [agent] = agencyStaffVM;
    const query = agent.fullName.toLowerCase();

    expect(searchAgencyStaff(query, agencyStaffVM)).toHaveLength(1);
  });

  it('should return one result when the hbx id of an agent is used to search', () => {
    const [agent] = agencyStaffVM;
    const query = agent.hbxId.toLowerCase();

    expect(searchAgencyStaff(query, agencyStaffVM)).toHaveLength(1);
  });

  it('should return multiple results when the agency name is used to search', () => {
    const [agent] = agencyStaffVM;
    const query = agent.agencyAssociations[0].agencyName.toLowerCase();

    // Grab total number of agencyStaffVM that have an association with that Agency
    const numberOfStaffWithAgency = agencyStaffVM.filter(staff =>
      staff.agencyAssociations.some(agency =>
        agency.agencyName.toLowerCase().includes(query)
      )
    ).length;

    expect(searchAgencyStaff(query, agencyStaffVM)).toHaveLength(
      numberOfStaffWithAgency
    );
  });

  it('should return multiple results when the primary agent name is used to search', () => {
    const [agent] = agencyStaffVM;
    const query = agent.agencyAssociations[0].primaryAgent.fullName.toLowerCase();

    // Grab total number of agencyStaffVM that have an association with that Primary Agent
    const numberOfStaffWithPrimaryAgent = agencyStaffVM.filter(staff =>
      staff.agencyAssociations.some(agency =>
        agency.primaryAgent.fullName.toLowerCase().includes(query)
      )
    ).length;

    expect(searchAgencyStaff(query, agencyStaffVM)).toHaveLength(
      numberOfStaffWithPrimaryAgent
    );
  });
});
