import { PrimaryAgentVM } from './primaryAgentVM';
import { AgencyRoleState } from '@hbx/api-interfaces';

export interface AgencyRoleVM {
  orgId: string;
  agencyProfileId: string;
  agencyName: string;
  profileType: string;
  primaryAgent: PrimaryAgentVM;
  currentState: AgencyRoleState;
  roleId: string;
}
