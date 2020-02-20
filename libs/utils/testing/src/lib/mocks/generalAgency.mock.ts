import { GeneralAgencyProfile, AgencyProfile } from '@hbx/api-interfaces';

import { mockBaseOrganizationProfile } from './baseOrganizationProfile.mock';
import { mockBaseBenefitSponsorsOrg } from './baseOrganization.mock';

export function mockGeneralAgency(agencyProfileId: string): AgencyProfile {
  const generalAgency: AgencyProfile = {
    ...mockBaseBenefitSponsorsOrg(),
    profiles: [mockGeneralAgencyProfile(agencyProfileId)],
  };

  return generalAgency;
}

function mockGeneralAgencyProfile(
  agencyProfileId: string
): GeneralAgencyProfile {
  const profile: GeneralAgencyProfile = {
    ...mockBaseOrganizationProfile(),
    _id: agencyProfileId,
    _type: `BenefitSponsors::Organizations::GeneralAgencyProfile`,
  };

  return profile;
}
