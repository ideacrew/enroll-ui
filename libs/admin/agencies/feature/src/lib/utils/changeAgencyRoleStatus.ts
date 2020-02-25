import { AgencyStaff } from '@hbx/api-interfaces';
import { Dictionary, Update } from '@ngrx/entity';
import { TerminationRequest } from '@hbx/admin/shared/ui-components';

export function changeAgencyRoleStatus(
  agencyStaff: Dictionary<AgencyStaff>,
  request: TerminationRequest
): Update<AgencyStaff> {
  const { agencyProfileId, agencyStaffId } = request;

  const agent = agencyStaff[agencyStaffId];

  const newRoles = agent.agency_roles.map(role => {
    if (role.agency_profile_id === agencyProfileId) {
      return {
        ...role,
        aasm_state: 'terminated',
      };
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
