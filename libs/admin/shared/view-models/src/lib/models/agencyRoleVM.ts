import { PrimaryAgentVM } from './primaryAgentVM';

export interface AgencyRoleVM {
  orgId: string;
  agencyProfileId: string;
  agencyName: string;
  profileType: string;
  primaryAgent: PrimaryAgentVM;
  currentState: string;
}
