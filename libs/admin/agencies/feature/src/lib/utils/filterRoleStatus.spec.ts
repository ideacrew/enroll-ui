import { mockAgencies } from '@hbx/utils/testing';
import {
  createPrimaryAgentDictionary,
  createAllAgencyVMs,
  createAgencyVMDictionary,
  createAllAgencyStaffVMs,
} from './';
import { filterRoleStatus } from './filterRoleStatus';

describe('Filter agents by status ', () => {
  const { agencies, agencyStaff, primaryAgents } = mockAgencies();
  const primaryAgentDictionary = createPrimaryAgentDictionary(primaryAgents);
  const agencyVMs = createAllAgencyVMs(agencies, primaryAgentDictionary);
  const agencyDictionary = createAgencyVMDictionary(agencyVMs);
  const agencyStaffVMs = createAllAgencyStaffVMs(agencyStaff, agencyDictionary);

  it('should return all agents when status is all', () => {
    const totalNumberOfStaff = agencyStaff.length;
    const numberOfPrimaryAgents = primaryAgents.length;
    const totalNumberOfAgencyStaff = totalNumberOfStaff - numberOfPrimaryAgents;

    expect(filterRoleStatus('all', agencyStaffVMs)).toHaveLength(
      totalNumberOfAgencyStaff
    );
  });
});
