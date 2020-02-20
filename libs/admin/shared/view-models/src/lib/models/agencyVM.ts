import { PrimaryAgentVM } from './primaryAgentVM';

export interface AgencyVM {
  orgId: string;
  legalName: string;
  profileType: string;
  primaryAgent: PrimaryAgentVM;
}
