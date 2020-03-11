import {
  AgencyStaff,
  RoleChangeRequest,
  AgencyRole,
  AgencyStaffWithDetail,
  WorkflowStateTransition,
  AgencyRoleState,
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

export function changeAgencyRoleStatusDetail(
  agent: AgencyStaffWithDetail,
  request: RoleChangeRequest
): AgencyStaffWithDetail {
  const { agencyRoleId } = request;

  const newRoles: AgencyRole[] = agent.agency_roles.map(role => {
    if (role.role_id === agencyRoleId) {
      const today = new Date();

      const thisYear = today.getFullYear();
      const thisMonth = today.getMonth();
      const thisDay = today.getDate();

      const newEvent: WorkflowStateTransition<AgencyRoleState> = {
        _id: 'temporary-id',
        transition_at: new Date(thisYear, thisMonth, thisDay).toISOString(),
        from_state: role.aasm_state,
        to_state: AgencyRoleState.Terminated,
      };

      const newRole: AgencyRole = {
        ...role,
        history: [...role.history, newEvent],
        aasm_state: request.to,
      };

      return newRole;
    } else {
      return role;
    }
  });

  const updatedAgent: AgencyStaffWithDetail = {
    ...agent,
    agency_roles: newRoles,
  };

  return updatedAgent;
}

export function undoAgencyRoleStatusDetailChange(
  agent: AgencyStaffWithDetail,
  request: RoleChangeRequest
): AgencyStaffWithDetail {
  const { agencyRoleId } = request;

  const newRoles: AgencyRole[] = agent.agency_roles.map(role => {
    if (role.role_id === agencyRoleId) {
      const updatedHistory = role.history.filter(
        event => event._id !== 'temporary-id'
      );

      const newRole: AgencyRole = {
        ...role,
        history: updatedHistory,
        aasm_state: request.to,
      };

      return newRole;
    } else {
      return role;
    }
  });

  const updatedAgent: AgencyStaffWithDetail = {
    ...agent,
    agency_roles: newRoles,
  };

  return updatedAgent;
}
