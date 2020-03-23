import { AgencyStaffVM, AgencyRoleVM } from '@hbx/admin/shared/view-models';

export function searchAgencyStaff(
  query: string,
  agencyStaffVMs: AgencyStaffVM[]
): AgencyStaffVM[] {
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

function searchAgentName(query: string, agencyStaff: AgencyStaffVM): boolean {
  const fullName = `${agencyStaff.firstName} ${agencyStaff.lastName}`;

  return fullName.toLowerCase().includes(query);
}

function searchHBXId(query: string, agencyStaff: AgencyStaffVM): boolean {
  return agencyStaff.hbxId.toLowerCase().includes(query);
}

function searchAgencyNames(query: string, agencyStaff: AgencyStaffVM): boolean {
  const roles: AgencyRoleVM[] = agencyStaff.agencyRoles;

  return (
    roles.filter(role => role.agencyName.toLowerCase().includes(query)).length >
    0
  );
}

function searchPrimaryAgent(
  query: string,
  agencyStaff: AgencyStaffVM
): boolean {
  const roles: AgencyRoleVM[] = agencyStaff.agencyRoles;

  return (
    roles.filter(role => {
      const fullName = `${role.primaryAgent.firstName} ${role.primaryAgent.lastName}`;
      return fullName.toLowerCase().includes(query);
    }).length > 0
  );
}
