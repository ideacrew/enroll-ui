import { Dictionary } from '@ngrx/entity';

import {
  AgencyProfile,
  PrimaryAgent,
  AgencyProfileType,
} from '@hbx/api-interfaces';
import {
  PrimaryAgentVM,
  AgencyVM,
  AgencyType,
} from '@hbx/admin/shared/view-models';

export function createSingleAgencyVM(
  profile: AgencyProfile,
  primaryAgents: Dictionary<PrimaryAgent>
): AgencyVM {
  const { agency_profile_id } = profile;

  const primaryAgent = primaryAgents[agency_profile_id];

  let primaryAgentVM: PrimaryAgentVM;
  let agencyProfileId: string;

  if (primaryAgent !== undefined) {
    primaryAgentVM = {
      firstName: primaryAgent.first_name,
      lastName: primaryAgent.last_name,
      npn: primaryAgent.agent_npn,
      roleId: primaryAgent.agent_role_id,
      hbxId: primaryAgent.hbx_id,
    };

    agencyProfileId = primaryAgent.connected_profile_id;
  } else {
    primaryAgentVM = {
      firstName: 'Idea',
      lastName: 'Crew',
      npn: '1234567890',
      roleId: 'fake',
      hbxId: 'fakeAsWell',
    };

    agencyProfileId = 'fakeProfileId';
  }

  const agencyVM: AgencyVM = {
    agencyName: profile.legal_name,
    orgId: profile.organization_id,
    profileType:
      profile.agency_profile_type === AgencyProfileType.Broker
        ? AgencyType.Broker
        : AgencyType.General,
    primaryAgent: primaryAgentVM,
    agencyProfileId,
  };

  return agencyVM;
}

export function createAgencyVMDictionary(
  agencies: AgencyVM[]
): Dictionary<AgencyVM> {
  return agencies.reduce((dictionary: Dictionary<AgencyVM>, agency) => {
    return {
      ...dictionary,
      [agency.agencyProfileId]: agency,
    };
  }, {});
}

export function createAllAgencyVMs(
  agencyProfiles: AgencyProfile[],
  primaryAgents: Dictionary<PrimaryAgent>
): AgencyVM[] {
  return agencyProfiles.map(profile =>
    createSingleAgencyVM(profile, primaryAgents)
  );
}
