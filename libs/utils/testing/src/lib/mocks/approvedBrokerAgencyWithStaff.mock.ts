import * as faker from 'faker/locale/en_US';

import {
  BrokerAgencyStaff,
  PrimaryBrokerStaff,
  Agency,
} from '@hbx/api-interfaces';
import {
  mockPrimaryBroker,
  mockBrokerAgencyStaff,
} from './brokerAgencyStaff.mock';
import { mockAgency } from './agency.mock';

const DEFAULT_STAFF = 5;

export interface MockBrokerAgencyOptions {
  totalStaff: number;
}

export interface ApprovedBrokerAgencyWithStaff {
  brokerAgency: Agency;
  primaryBroker: PrimaryBrokerStaff;
  brokerStaff: BrokerAgencyStaff[];
}

export function approvedBrokerAgencyWithStaff(
  options: MockBrokerAgencyOptions = { totalStaff: DEFAULT_STAFF }
): ApprovedBrokerAgencyWithStaff {
  const primaryBrokerRoleId = faker.random.uuid();
  const agencyProfileId = faker.random.uuid();

  const primaryBroker = mockPrimaryBroker(agencyProfileId, primaryBrokerRoleId);

  const brokerAgency = mockAgency(agencyProfileId, primaryBrokerRoleId);

  // Creates an array that is totalStaff long and fills it with mock staff
  const brokerStaff = Array.from({ length: options.totalStaff }, () =>
    mockBrokerAgencyStaff(agencyProfileId)
  );

  return {
    brokerAgency,
    primaryBroker,
    brokerStaff,
  };
}
