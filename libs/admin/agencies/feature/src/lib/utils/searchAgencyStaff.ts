import { AgencyStaff, AgentRole } from '@hbx/api-interfaces';

export function searchAgencyStaff(
  query: string,
  agencyStaffVMs: AgencyStaff[]
): AgencyStaff[] {
  if (query === null || query.length === 0) {
    return agencyStaffVMs;
  } else {
    return agencyStaffVMs.filter(agencyStaff => {
      return (
        searchAgentName(query, agencyStaff) ||
        searchAgencyNames(query, agencyStaff) ||
        searchHBXId(query, agencyStaff) ||
        searchPrimaryAgent(query, agencyStaff)
      );
    });
  }
}

function searchAgentName(query: string, agencyStaff: AgencyStaff): boolean {
  const fullName = `${agencyStaff.firstName} ${agencyStaff.lastName}`;

  return fullName.toLowerCase().includes(query);
}

function searchHBXId(query: string, agencyStaff: AgencyStaff): boolean {
  return agencyStaff.hbxId.toLowerCase().includes(query);
}

function searchAgencyNames(query: string, agencyStaff: AgencyStaff): boolean {
  const roles: AgentRole[] = agencyStaff.agentRoles;

  return (
    roles.filter(role => role.agencyName.toLowerCase().includes(query)).length >
    0
  );
}

function searchPrimaryAgent(query: string, agencyStaff: AgencyStaff): boolean {
  const roles: AgentRole[] = agencyStaff.agentRoles;

  return (
    roles.filter(role => {
      const fullName = `${role.primaryAgent.firstName} ${role.primaryAgent.lastName}`;
      return fullName.toLowerCase().includes(query);
    }).length > 0
  );
}
