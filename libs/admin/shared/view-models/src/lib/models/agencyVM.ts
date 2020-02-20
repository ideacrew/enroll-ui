import { PrimaryAgentVM } from './primaryAgentVM';

export interface AgencyVM {
  orgId: string;
  agencyName: string;
  profileType: string;
  primaryAgent: PrimaryAgentVM;
  agencyProfileId: string;
}
