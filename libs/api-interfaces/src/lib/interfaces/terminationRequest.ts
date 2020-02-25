import { AgencyRoleState } from '../models';

// TODO: Generalize this to accept all role-state change requests
export interface RoleChangeRequest {
  agencyStaffId: string;
  agencyRoleId: string;
  from: AgencyRoleState;
  to: AgencyRoleState;
}
