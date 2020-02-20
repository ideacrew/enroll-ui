import * as faker from 'faker/locale/en_US';

import { AgencyProfile, GeneralAgencyStaff } from '@hbx/api-interfaces';

import { mockGeneralAgencyStaff } from './generalAgencyStaff.mock';
import { mockGeneralAgency } from './generalAgency.mock';

const DEFAULT_STAFF = 5;

export interface MockGeneralAgencyOptions {
  totalStaff: number;
}

export interface ApprovedGeneralAgencyWithStaff {
  generalAgency: AgencyProfile;
  primaryAgent: GeneralAgencyStaff;
  agencyStaff: GeneralAgencyStaff[];
}

export function approvedGeneralAgencyWithStaff(
  options: MockGeneralAgencyOptions = { totalStaff: DEFAULT_STAFF }
): ApprovedGeneralAgencyWithStaff {
  const agencyProfileId = faker.random.uuid();

  const primaryAgent = mockGeneralAgencyStaff(true, agencyProfileId);
  const generalAgency = mockGeneralAgency(agencyProfileId);

  // Creates an array that is totalStaff long and fills it with mock staff
  const agencyStaff = Array.from({ length: options.totalStaff }, () =>
    mockGeneralAgencyStaff(false, agencyProfileId)
  );

  return {
    generalAgency,
    primaryAgent,
    agencyStaff,
  };
}
