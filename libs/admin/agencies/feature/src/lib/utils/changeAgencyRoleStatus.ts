import {
  AgencyStaff,
  RoleChangeRequest,
  AgencyRole,
} from '@hbx/api-interfaces';
import { Dictionary, Update } from '@ngrx/entity';

export function changeAgencyRoleStatus(
  agencyStaff: Dictionary<AgencyStaff>,
  request: RoleChangeRequest
): Update<AgencyStaff> {
  const { agencyRoleId, agencyStaffId } = request;

  const agent = agencyStaff[agencyStaffId];

  const newRoles: AgencyRole[] = agent.agency_roles.map(role => {
    if (role.role_id === agencyRoleId) {
      const newRole: AgencyRole = {
        ...role,
        aasm_state: request.to,
      };

      return newRole;
    } else {
      return role;
    }
  });

  return {
    id: request.agencyStaffId,
    changes: {
      agency_roles: newRoles,
    },
  };
}
