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
  changeHistory?: ChangeHistory<AgencyRoleState>[];
}

export interface ChangeHistory<T> {
  changedFrom: T;
  changedTo: T;
  changedAt: Date; // will be converted to Date object
}
