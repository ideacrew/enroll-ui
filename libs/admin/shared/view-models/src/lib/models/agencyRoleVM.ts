import { PrimaryAgentVM } from './primaryAgentVM';

export interface AgencyRoleVM {
  orgId: string;
  profileId: string;
  legalName: string;
  profileType: string;
  primaryAgent: PrimaryAgentVM;
  currentState: string;
}
