import { mockAgencies } from '@hbx/utils/testing';

import { searchAgencyStaff } from './searchAgencyStaff';
import {
  createAllAgencyStaffVMs,
  createPrimaryAgentDictionary,
} from './createAgencyStaffVM';
import { createAllAgencyVMs, createAgencyVMDictionary } from './createAgencyVM';

describe('Search agency staff VMs', () => {
  const { agencies, agencyStaff, primaryAgents } = mockAgencies();
  const primaryAgentDictionary = createPrimaryAgentDictionary(primaryAgents);
  const agencyVMs = createAllAgencyVMs(agencies, primaryAgentDictionary);
  const agencyDictionary = createAgencyVMDictionary(agencyVMs);
  const agencyStaffVMs = createAllAgencyStaffVMs(agencyStaff, agencyDictionary);

  it('should return a full set of results when the search string is empty', () => {
    const totalNumberOfStaff = agencyStaff.length;
    const numberOfPrimaryAgents = primaryAgents.length;
    const totalNumberOfAgencyStaff = totalNumberOfStaff - numberOfPrimaryAgents;

    expect(searchAgencyStaff('', agencyStaffVMs)).toHaveLength(
      totalNumberOfAgencyStaff
    );
  });

  it('should return zero results when no matches are found', () => {
    const query = '23adfsgdsl343lkjf;lkdf;laskd3483783';

    expect(searchAgencyStaff(query, agencyStaffVMs)).toHaveLength(0);
  });

  // When performing queries, pass in a trimmed, lowercase string
  it('should return one result when the full name of an agent is used to search', () => {
    const [agent] = agencyStaffVMs;
    const query = agent.firstName.toLowerCase();

    expect(searchAgencyStaff(query, agencyStaffVMs)).toHaveLength(1);
  });

  it('should return one result when the hbx id of an agent is used to search', () => {
    const [agent] = agencyStaffVMs;
    const query = agent.hbxId.toLowerCase();

    expect(searchAgencyStaff(query, agencyStaffVMs)).toHaveLength(1);
  });

  it('should return multiple results when the agency name is used to search', () => {
    const [agent] = agencyStaffVMs;
    const query = agent.agencyRoles[0].agencyName.toLowerCase();

    // Grab total number of agencyStaffVMs that have an association with that Agency
    const numberOfStaffWithAgency = agencyStaffVMs.filter(staff =>
      staff.agencyRoles.some(agency =>
        agency.agencyName.toLowerCase().includes(query)
      )
    ).length;

    expect(searchAgencyStaff(query, agencyStaffVMs)).toHaveLength(
      numberOfStaffWithAgency
    );
  });

  it('should return multiple results when the primary agent name is used to search', () => {
    const [agent] = agencyStaffVMs;
    const query = agent.agencyRoles[0].primaryAgent.firstName.toLowerCase();

    // Grab total number of agencyStaffVMs that have an association with that Primary Agent
    const numberOfStaffWithPrimaryAgent = agencyStaffVMs.filter(staff =>
      staff.agencyRoles.some(agency =>
        agency.primaryAgent.firstName.toLowerCase().includes(query)
      )
    ).length;

    expect(searchAgencyStaff(query, agencyStaffVMs)).toHaveLength(
      numberOfStaffWithPrimaryAgent
    );
  });
});
