import { AgencyStaffVM, AgencyRoleVM } from '@hbx/admin/shared/view-models';

export function filterRoleStatus(
  status: string,
  agencyStaff: AgencyStaffVM[]
): AgencyStaffVM[] {
  if (status === 'all') {
    return agencyStaff;
  } else {
    const filteredStaff: AgencyStaffVM[] = agencyStaff.filter(staff => {
      const roles: AgencyRoleVM[] = staff.agencyRoles;

      return (
        roles.filter(role => {
          return role.currentState.toLowerCase().includes(status);
        }).length > 0
      );
    });

    return filteredStaff;
  }
}
